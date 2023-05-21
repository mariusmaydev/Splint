
SPLINT.require_now("@SPLINT_ROOT/Utils/color/AcolorConverter.js");
/**
 * @class Color API
 */
 class S_Colors extends S_ColorsConverter {
    static colorHSVa = class S_colorHSVa extends S_Colors {
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
            let hex = S_Colors.hexToRgb(hexIn);
            let c = S_Colors.rgbToHsv(hex.r, hex.g, hex.b);
            this.h = c.h;
            this.s = c.s;
            this.v = c.v;
            return this;
        } 
        fromRGB(S_color){
            let c = S_Colors.rgbToHsv(S_color.r, S_color.g, S_color.b);
            this.h = c.h;
            this.s = c.s;
            this.v = c.v;
            this.a = S_color.a;
            return this;
        }
    }
    static colorHSLa = class S_colorHSLa extends S_Colors {
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
            let c = S_Colors.rgbToHsl(S_color.r, S_color.g, S_color.b);
            this.h = c.h;
            this.s = c.s;
            this.l = c.l;
            this.a = S_color.a;
            return this;
        }
    }
    static colorRGBa = class S_colorRGBa extends S_Colors {
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
            let hex = S_Colors.hexToRgb(hexIn);
            this.r = hex.r;
            this.g = hex.g;
            this.b = hex.b;
            return this;
        } 
        fromHSL(color){
            let c = S_Colors.hslToRgb(color.h, color.s, color.l);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = color.a;
            return this;
        }  
        fromHSV(color){
            let c = S_Colors.hsvToRgb(color.h, color.s, color.v);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = color.a; 
            return this;
        }
    }
    static Gradient = class Gradient extends Array {
        static get [Symbol.species]() { return Array; }

        static {
            super.SPLINT.hideProperty('steps');
            super.SPLINT.hideProperty('_color1');
            super.SPLINT.hideProperty('_color2');
            super.SPLINT.hideProperty('color2');
            super.SPLINT.hideProperty('color1');
        }
        clone(){
            return new Gradient(this._color1, this._color2, this._steps);
        }
        constructor(color1, color2, steps = 2){
            super();
            this._color1 = color1;
            this._color2 = color2;
            this._steps  = steps;
            this.SPLINT.hideProperty('_color1');
            this.SPLINT.hideProperty('_color2');
            this.SPLINT.hideProperty('_steps');
            this.SPLINT.hideProperty('name');
            this.SPLINT.hideProperty('type');
            this.type = "hsva";
            this.name = "new gradient";
        }
        switchColors(){
            let r = S_Colors.parse(this.color2, 'rgba');
            this._color2 = S_Colors.parse(this.color1, 'rgba');
            this.color1 = r;
        }
        set steps(v){
            this._steps = v;
            this.#generate();
        }
        get steps(){
            return this._steps
        }
        set color1(v){
            this._color1 = v;
            this.#generate();
        }
        get color1(){
            return this._color1;
        }
        set color2(v){
            this._color2 = v;
            this.#generate();
        }
        get color2(){
            return this._color2;
        }
        #generate(){      
            while (this.length > 0) {
                this.pop();
            }      
            this._color1 = S_Colors.parse(this._color1, 'hsva');
            this._color2 = S_Colors.parse(this._color2, 'hsva');
            let Hstep = Math.abs(this._color1.h - this._color2.h) / (this._steps);
            let Sstep = Math.abs(this._color1.s - this._color2.s) / (this._steps);
            let Vstep = Math.abs(this._color1.v - this._color2.v) / (this._steps);
            let Astep = Math.abs(this._color1.a - this._color2.a) / (this._steps);
            for(let i = 0; i < this._steps; i++){
                let h = this._color1.h + (Hstep * i);
                let s = this._color1.s + (Sstep * i);
                let v = this._color1.v + (Vstep * i);
                let a = this._color1.a + (Astep * i);
                let cn = new S_Colors.colorHSVa(h, s, v, a);
                this.push(cn);
            }
        }
    }
    static parse(colorIn, type){
        if(colorIn.type == type){
            return colorIn;
        }
        let colorOut;
        //Out
        switch(type){
            case 'rgba' : colorOut = new S_Colors.colorRGBa(); break;
            case 'hsva' : colorOut = new S_Colors.colorHSVa(); break;
            // case 'hsla' : colorOut = new S_TColors.colorHSLa(); break;
            default: SPLINT.debugger.error("S_Color", "parsing exception"); break;
        }
        //In
        switch(colorIn.type){
            case 'rgba' : return (colorOut.fromRGB(colorIn)); break;
            case 'hsva' : return (colorOut.fromHSV(colorIn)); break;
            // case 'hsla' : return colorOut.fromHSL(colorIn); break;
            default: SPLINT.debugger.error("S_Color", "parsing exception"); break;
        }
    }
    
    constructor(){
        super();
    }
    
}