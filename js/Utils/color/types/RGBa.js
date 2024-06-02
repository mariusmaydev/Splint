SPLINT.require_now("@SPLINT_ROOT/Utils/color/color.js");
class S_colorRGBa extends SPLINT.Utils.Colors {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        super();
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.type = "rgba";
        Object.defineProperty(this, 'type', {
            value: "rgba",
            writable: true,
            configurable : false,
            enumerable: false,
        });
    }   
    fromHex(hexIn){
        let hex = SPLINT.Utils.Colors.hexToRgb(hexIn);
        this.r = hex.r;
        this.g = hex.g;
        this.b = hex.b;
        return this;
    } 
    fromHSL(color){
        let c = SPLINT.Utils.Colors.hslToRgb(color.h, color.s, color.l);
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = color.a;
        return this;
    }  
    fromHSV(color){
        let c = SPLINT.Utils.Colors.hsvToRgb(color.h, color.s, color.v);
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = color.a; 
        return this;
    }
}
