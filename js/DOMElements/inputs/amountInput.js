class AmountInput {
    constructor(parent, name, amount = 1, arg = "", digits = 0){
      this.parent = parent;
      this.name = name;
      this.arg = arg;
      this.min = 1;
      this.max = null;
      this.digits = digits;
      this._step = 1 / Math.pow(10, this.digits);
      this.amount = amount;
      this.id = "AmountInput_" + name + "_" + parent.id + "_";
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
      this.mainElement.Class("AmountDiv");
      this.oninput = function(){};
      this.draw();
    }
    set step(v){
        this._step = v;
    }
    get step(){
        return this._step;
    }
    set disabled(v){
        this.mainElement.setAttribute("disabled", v);
    }
    set value(v){
        if(v > this.min){
          this.amount = v;
          this.amountInput.value = this.#parseNumber2String(this.amount);
        }
    }
    get value(){
        return this.amount;
    }
    draw(){
      let button_sub = new SPLINT.DOMElement.Button(this.mainElement, "sub");
          button_sub.bindIcon("remove");
          button_sub.onclick = function(){
            let amountBefore = this.#parseInput(this.amountInput.value);
            if(this.#parseInput(this.amountInput.value) > this.min){
              this.amount = SPLINT.Tools.Math.add(this.#parseInput(this.amountInput.value), -this.step, true);
              this.amountInput.value = this.#parseNumber2String(this.amount);
            }
            this.oninput(this.amount, amountBefore);
          }.bind(this);
  
      this.amountDiv = new SPLINT.DOMElement(this.id + "inputDiv", "div", this.mainElement);
          this.amountInput = new SPLINT.DOMElement(this.id + "input", "input", this.amountDiv);
          this.amountInput.value = this.#parseNumber2String(this.amount);
          this.amountInput.oninput = function(){
            if(this.max == null || this.#parseInput(this.amountInput.value) < this.max){
                if(this.#parseInput(this.amountInput.value) > this.min){
                    this.amount = this.#parseInput(this.amountInput.value);
                    this.amountInput.value = this.#parseNumber2String(this.amount);
                    this.oninput(this.amount);
                } else {
                    this.amount = this.min;
                    this.amountInput.value = this.#parseNumber2String(this.amount);
                    this.oninput(this.amount);
                }
            } else {
                this.amount = this.max;
                this.amountInput.value = this.#parseNumber2String(this.amount);
                this.oninput(this.amount);
            }
          }.bind(this);
  
  
      let button_add = new SPLINT.DOMElement.Button(this.mainElement, "add");
          button_add.bindIcon("add");
          button_add.onclick = function(){
            let amountBefore = this.#parseInput(this.amountInput.value);
            if(this.max == null || this.#parseInput(this.amountInput.value) < this.max){
                this.amount = SPLINT.Tools.Math.add(this.#parseInput(this.amountInput.value), parseFloat(this.step), true);
                this.amountInput.value = this.#parseNumber2String(this.amount);
            }
            this.oninput(this.amount, amountBefore);
          }.bind(this);
    }
    #parseInput(number){
        let str = number.replace(this.arg, "");

        let v = parseFloat(str);
        let g = SPLINT.Tools.Math.divide(parseInt(SPLINT.Tools.Math.multiply(v, Math.pow(10, this.digits), true)), Math.pow(10, this.digits), true);
        g = parseFloat(g.toFixed(this.digits));
        return g;
    }
    #parseNumber2String(number){
        let str = number;
        if(typeof number != "string"){
            str = number.toString();
        }
        if(this.digits == 0){
            return str + this.arg;
        }
        if(str.split(".").length != 2){
            str += ".";
            for(let i = 0; i < this.digits; i++) {
                str += "0";
            }
            return str + this.arg;
        }

        let dif = this.digits - str.split(".")[1].length;
        for(let i = 0; i < dif; i++) {
            str += "0";
        }
        return str + this.arg;
    }
  }