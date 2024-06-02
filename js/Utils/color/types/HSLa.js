SPLINT.require_now("@SPLINT_ROOT/Utils/color/color.js");

class S_colorHSLa extends SPLINT.Utils.Colors {
    constructor(h = 0, s = 0, l = 0, a = 1) {
        super();
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
        this.type = "hsla";
        Object.defineProperty(this, 'type', {
            value: "hsla",
            writable: true,
            configurable : false,
            enumerable: false,
        });
    }
    fromRGB(S_color){
        let c = SPLINT.Utils.Colors.rgbToHsl(S_color.r, S_color.g, S_color.b);
        this.h = c.h;
        this.s = c.s;
        this.l = c.l;
        this.a = S_color.a;
        return this;
    }
}