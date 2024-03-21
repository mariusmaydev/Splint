
class S_BinaryImageHelper {
    static part16BitList = [];
    static {
        this.Canvas16 = this.getCanvas(16, 1);
        this.ctx16 = this.Canvas16.getContext("2d");
    }
    static getCanvas(width, height) {
        let Canvas;
        if(SPLINT.isWorker){
            Canvas = new OffscreenCanvas(width, height);
        } else {
            Canvas = document.createElement("canvas");
        }
        Canvas.width = width;
        Canvas.height = height;
        return Canvas;
    }
    static setPixelFix(u8, x, r, g, b, a) {
        var index = 4 * x;
        u8[index+0] = r;
        u8[index+1] = g;
        u8[index+2] = b;
        u8[index+3] = a;
    }
    static translate16Bit(arrayOf16){
        let u8 = this.part16BitList[arrayOf16];
        if(u8 == undefined) {
            u8 = new Uint8Array(64)
            // imageData = this.ctx16.createImageData(16, 1)
            for(let i = 0; i < 16; i++){
                if(arrayOf16[15 - i] == 1){
                    this.setPixelFix(u8, i, 255, 255, 255, 255);
                    // this.setPixelFix(imageData, i, 255, 255, 255, 255)
                } else {
                    this.setPixelFix(u8, i, 0, 0, 0, 0);
                    // this.setPixelFix(imageData, i, 0, 0, 0, 0)
                }
            }
            this.part16BitList[arrayOf16] = u8;
        }
        return u8;
    }
}