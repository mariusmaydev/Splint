
importScripts(location.origin + "/Splint/js/dataTypes/BinaryImage/BinaryImage.js");

class S_BinaryImageWorker extends SPLINT.Worker.WorkerHelper.WebWorkerTemplate {
    static {
        new this();
    }
    async fromUint8ClampedArray(data){
        let Uint8C_in = data.array
        let width_in = data.width
        let height_in = data.height

        let height_out  = height_in;
        let width_out   = width_in;
        let imageData = new ImageData(Uint8C_in, width_in, height_in);

            let flag = false;
            width_out  = imageData.width;
            height_out = imageData.height;
            
            if(height_out % 16 != 0){
                height_out = Math.ceil(height_out / 16) * 16;
                let ratio = height_out / imageData.height;
                let h1 = Math.floor(imageData.width * ratio);
                if(h1 % 16 != 0){
                    width_out = Math.floor(h1 / 16) * 16;
                }
                flag = true;
            } else if(width_out % 16 != 0){
                width_out = Math.ceil(width_out / 16) * 16;
                let ratio = width_out / imageData.width;
                let h1 = Math.floor(imageData.height * ratio);
                if(h1 % 16 != 0){
                    height_out = Math.floor(h1 / 16) * 16;
                }
                flag = true;
            }
            if(flag){
                let cv = S_BinaryImageHelper.getCanvas(imageData.width, imageData.height);
                let cvctx = cv.getContext("2d");
                    cvctx.putImageData(imageData, 0, 0);
                    
                let cv2 = S_BinaryImageHelper.getCanvas(width_out, height_out);
                let cvctx2 = cv2.getContext("2d");
                    cvctx2.drawImage(cv, 0, 0, cv.width, cv.height, 0, 0, cv2.width, cv2.height);
                    
                    imageData = cvctx2.getImageData(0, 0, cv2.width, cv2.height);
            }
            let dataC = new Uint16Array(width_out * height_out / 16);
            let f = 0;
            for(let e = 0; e < dataC.length * 16 * 4; e += (4 * 16)) {
                dataC[f] = 0;
                for(let i = 0; i < (4 * 16); i += 4) {
                    const alpha = imageData.data[e + i + 3];
                    if(alpha > 20){
                        dataC[f] += Math.pow(2, (i / 4)); 
                    }
                } 
                f++;
            } 
            let width_outS = width_out / 16;
            let height_outS = height_out / 16;
            let map = [];
            for(let y = 0; y < height_outS; y++){
                for(let x = 0; x < width_outS; x++){
                    let block = false;
                    let q = [];
                    for(let y1 = 0; y1 < 16; y1++){

                        let ind = (x + (y * 16 + y1 ) * width_outS);
                        q.push(dataC[ind]);
                        if(dataC[ind] != 0){
                            block = true;
                        }
                    }
                    if(block == true){
                        let t = new Uint16Array(17);
                            t[0] = (x + (y * width_outS));
                            t.set(q, 1);
                            map.push(t);
                    }
                }
            }
            let t4 = new Uint16Array(map.length * 17);
            for(const i in map){
                t4.set(map[i], i * 17)
            }

        let res = new Object();
            res.imageData = imageData;
            res.widthS = width_outS;
            res.heightS = height_outS;
            res.height = height_out;
            res.width = width_out;
            res.data = t4;
        return res;
    }
}