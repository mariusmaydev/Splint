SPLINT.require_now("@SPLINT_ROOT/dataTypes/BinaryImage/BinaryImageHelper.js");
SPLINT.require_now("@SPLINT_ROOT/dataTypes/BinaryImage/BinaryImageLoader.js");

class S_BinaryImage extends S_BinaryImageLoader {
    static {
        if(!SPLINT.isWorker){
            this.WorkerManager = new SPLINT.Worker.WebWorker.Manager("@SPLINT_ROOT/js/dataTypes/BinaryImage/_BinaryImageWorker.js", "ManagerBinaryImage");
            this.worker1 = this.WorkerManager.connect("BinaryImageWorkerMain", true, false);
        }
    }
        constructor(){
            super();
            this.widthS;
            this.heightS;
            this.width;
            this.height;
            this.data;
            this.blob           = null; // BinImg    - Blob
            this.Uint16Array    = null; // BinImg    - Uint16Array
            this.Base64         = null; // Base64    - normal
            this.ImageData      = null; // ImageData - normal
        }
        async saveToURL(url){
            // let sFetch = new SPLINT.SimpleFetch(PATH.php.upload);
                // sFetch.SPLINT_accessKey = "THUMBNAIL";
                // sFetch.body = this.getAs_Blob();
                // sFetch.headers["Content-Type"] = "application/octet-stream";
                // sFetch.method = "POST";
                // return sFetch.send();
            let bd = this.getAs_Blob();

            console.dir(this)
            let controller = new AbortController()
            let signal = controller.signal

            let headers = new Object();
                headers["X-SPLINT-ACCESS_KEY"] =  "THUMBNAIL";
                headers["Content-Type"] =  "application/octet-stream";
            return await fetch(PATH.php.upload, {
                method: "POST",
                headers: headers,
                body:  bd,
                signal: signal
            }).then(function(res){
                controller.abort();
                return res
            }).catch(function(re){
                return res;
            });
        }
        getAs_Uint16Array(reload = false){
            if(this.Uint16Array == null || reload){
                this.Uint16Array    = new Uint16Array(this.data.length + 2);
                this.Uint16Array[0] = this.width;
                this.Uint16Array[1] = this.height;
                this.Uint16Array.set(this.data, 2);
            }
            return this.Uint16Array;
        }
        getAs_Blob(reload = false){
            if(this.blob == null || reload){
                let array = this.getAs_Uint16Array();
                this.blob = new Blob([array], {type: "application/octet-stream"});
            }
            return this.blob;
        }
        async export_Image(reload = false){
            if(this.Image == null || reload){
                let base64 = await this.export_base64();

                let img = new Image();
                    img.src = base64;
            }
        }
        async export_base64(reload = false){
            if(SPLINT.isWorker){
                console.error("not worker save");
                return;
            }
            if(this.Base64 == null || reload){
                let canvas = S_BinaryImageHelper.getCanvas(this.width, this.height);
                let ctx    = canvas.getContext("2d");

                if(this.ImageData == null || reload){
                    this.ImageData  = ctx.createImageData(canvas.width, canvas.height);

                    let uAO = new Uint8ClampedArray(this.width * this.height * 4);
                    for(let i = 0; i < this.data.length; i += 17) {
                        let index = this.data[i];
                        let mod = index % this.widthS;
                        let x = mod * 16;
                        let y = (index - mod ) / this.widthS * 16;
                        for(let iK = 0; iK < 16; iK++){
                            let zhu = S_BinaryImageHelper.translate16Bit((this.data[i + iK + 1]).toString(2).padStart(16, "0"));
                            let ind = (y + iK) * (this.width * 4) + x * 4;
                            uAO.set(zhu, ind);
                        }
                    }
                    this.ImageData.data.set(uAO, 0);
                }
                ctx.putImageData(this.ImageData, 0, 0);
                this.Base64 = canvas.toDataURL("image/png", 1);
            }
            return this.Base64;

        }
        async export_imageData(reload = false){
            if(this.ImageData == null || reload){
                let canvas = S_BinaryImageHelper.getCanvas(this.width, this.height);
                let ctx = canvas.getContext("2d");
                this.ImageData = ctx.createImageData(canvas.width, canvas.height);
    
                let uAO = new Uint8ClampedArray(this.width * this.height * 4);
                for(let i = 0; i < this.data.length; i += 17) {
                    let index = this.data[i];
                    let mod = index % this.widthS;
                    let x = mod * 16;
                    let y = (index - mod ) / this.widthS * 16;
                    for(let iK = 0; iK < 16; iK++){
                        let zhu = S_BinaryImageHelper.translate16Bit((this.data[i + iK + 1]).toString(2).padStart(16, "0"));
                        let ind = (y + iK) * (this.width * 4) + x * 4;
                        uAO.set(zhu, ind);
                    }
                }
                this.ImageData.data.set(uAO, 0);
            }
            return this.ImageData;
        }
        async download(name = "test"){
            if(SPLINT.isWorker){
                console.error("download not worker save");
                return;
            }
                let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";

                let blob = this.getAs_Blob();
                let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
        }
    
    
    
}