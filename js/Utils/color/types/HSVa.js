SPLINT.require_now("@SPLINT_ROOT/Utils/color/color.js");
class S_colorHSVa extends SPLINT.Utils.Colors {
    constructor(h = 0, s = 0, v = 0, a = 1) {
        super();
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
        this.type = "hsva";
        Object.defineProperty(this, 'type', {
            value: "hsva",
            writable: true,
            configurable : false,
            enumerable: false,
        });
    }    
    fromHEX(hexIn){
        let hex = SPLINT.Utils.Colors.hexToRgb(hexIn);
        let c = SPLINT.Utils.Colors.rgbToHsv(hex.r, hex.g, hex.b);
        this.h = c.h;
        this.s = c.s;
        this.v = c.v;
        return this;
    } 
    fromRGB(S_color){
        let c = SPLINT.Utils.Colors.rgbToHsv(S_color.r, S_color.g, S_color.b);
        this.h = c.h;
        this.s = c.s;
        this.v = c.v;
        this.a = S_color.a;
        return this;
    }
}