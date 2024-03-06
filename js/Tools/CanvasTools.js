
class S_CanvasTools {
    static async ImageData2base64(imageData){
        let canvas      = document.createElement("canvas");
            canvas.width    = imageData.width;
            canvas.height   = imageData.height;
        let ctx = canvas.getContext("2d");
            ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png", 1);
    }
    static async resizeCanvasQuadratic(canvasIn, bigger = true){
        
        let h = canvasIn.height;
        let w = canvasIn.width;
        if(bigger){
            if(canvasIn.height > canvasIn.width){
                w = canvasIn.height;
                h = canvasIn.height;
            } else { 
                w = canvasIn.width;
                h = canvasIn.width;
            }
        } else {
            if(canvasIn.height < canvasIn.width){
                w = canvasIn.height;
                h = canvasIn.height;
            } else { 
                w = canvasIn.width;
                h = canvasIn.width;
            }
        }
        return this.resizeCanvas(canvasIn, w, h);
    }
    static async loadImageAsBlob(url){
        let resp = await fetch(url);
        return await resp.blob();
    }
    static imageToImageData(img){
        let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.heigth = img.height;
        let ctx = canvas.getContext("2d");
            ctx.drawImage(img, img.width, img.height);
        return ctx.getImageData(0, 0, img.width, img.height);
            
    }
    // static base64ToImageData(buffer, width, height) {
    //     return new Promise(resolve => {
    //         let image = new Image();
    //             image.addEventListener('load', function (e) {
    //                 let canvasElement = document.createElement('canvas');
    //                     canvasElement.width = width;
    //                     canvasElement.height = height;
    //                 let context = canvasElement.getContext('2d');
    //                     context.drawImage(e.target, 0, 0, width, height);
    //                 resolve(context.getImageData(0, 0, width, height));
    //             });
    //         // image.src = 'data:image/png;base64,' + buffer;

    //     });
    // }
    static async resizeCanvas(canvasIn, newWidth, newHeight){
        let height1 = canvasIn.height;
        let width1  = canvasIn.width; 
        let canvasOut = document.createElement("canvas");
            canvasOut.width     = newWidth;
            canvasOut.height    = newHeight;
        let ctx = canvasOut.getContext("2d");
            ctx.drawImage(canvasIn, 0, 0, width1, height1, 0, 0, newWidth, newHeight)
        return canvasOut;
        //     h = height;
        // w = width;

        // if(height < width){
        //     w = height*2;
        //     h = height*2;
        // } else { 
        //     w = width*2;
        //     h = width*2;
        // }
        // // Using  legacy context2d.getImageData() for now.
        // const canvas = new OffscreenCanvas(w, h);
        // ctx_i = canvas.getContext("2d", { willReadFrequently: true });
        // ctx_i.drawImage(source, 0, 0, width, height, 0, 0, w, h);
        // source.close(); // free memory, we don't need it anymore
        // const imageData = ctx_i.getImageData(0, 0, w, h);
    }
}