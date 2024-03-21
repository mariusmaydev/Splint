
class S_BinaryImageLoader {
    static isInWork = null;
    static async fromImageData(imageData){
        let worker = await S_BinaryImage.worker1;
        let res = await worker.sendInPromise("fromUint8ClampedArray", {array : imageData.data, width: imageData.width, height: imageData.height});
     
        let obj = new S_BinaryImage()
            obj.ImageData   = res.data.imageData;
            obj.data        = res.data.data;
            obj.width       = res.data.width;
            obj.height      = res.data.height;
            obj.heightS     = res.data.heightS;
            obj.widthS      = res.data.widthS;
            return obj;
    }
    static async fromUint16Array(array){
        let binI = new S_BinaryImage();
            binI.data   = array.slice(2);
            binI.width  = array[0];
            binI.height = array[1];
            binI.widthS = binI.width / 16;
            binI.heightS = binI.height / 16;
        return binI;
    }
    static async fromBlob(blob){
        let d = await blob.arrayBuffer();
        let g = new Uint16Array(d);
        return await S_BinaryImage.fromUint16Array(g);
    }
    static async fromURL(url){
        let response = await fetch(url);
        let data = await response.arrayBuffer();
        let b = new Uint16Array(data);
        return await SPLINT.BinaryImage.fromUint16Array(b)
    }
    static async fromImage(image){
        let canvas = S_BinaryImageHelper.getCanvas(image.width, image.height);
        let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return await this.fromImageData(imgData);
    }
}