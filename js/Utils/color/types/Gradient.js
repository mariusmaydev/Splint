class Gradient extends Array {
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
        let r = SPLINT.Utils.Colors.parse(this.color2, 'rgba');
        this._color2 = SPLINT.Utils.Colors.parse(this.color1, 'rgba');
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
        this._color1 = SPLINT.Utils.Colors.parse(this._color1, 'hsva');
        this._color2 = SPLINT.Utils.Colors.parse(this._color2, 'hsva');
        let Hstep = Math.abs(this._color1.h - this._color2.h) / (this._steps);
        let Sstep = Math.abs(this._color1.s - this._color2.s) / (this._steps);
        let Vstep = Math.abs(this._color1.v - this._color2.v) / (this._steps);
        let Astep = Math.abs(this._color1.a - this._color2.a) / (this._steps);
        for(let i = 0; i < this._steps; i++){
            let h = this._color1.h + (Hstep * i);
            let s = this._color1.s + (Sstep * i);
            let v = this._color1.v + (Vstep * i);
            let a = this._color1.a + (Astep * i);
            let cn = new SPLINT.Utils.Colors.colorHSVa(h, s, v, a);
            this.push(cn);
        }
    }
}