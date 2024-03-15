

class S_rangeSlider {
    #_label;
    #_min               = 0;
    #_max               = 10;
    #_step              = 1;
    #_value             = 5;
    #_disabled          = false;
    #_drawTickMarks     = false;
    #_valueExtension    = "";
    #_drawSignOnTop     = true;
    #_drawValueOuput    = false;
    #_valuePercent      = 0;

    constructor(parent, name, label = ""){
      this.id           = "S-RangeSlider__" + name + "__";
      this.parent       = parent;
      this.name         = name;
      this.#_label      = label;
      this.thumbWidth   = 16;
      this.oninput          = function(value){};
      this.oninputFinished  = function(value){};
      this.oninputStart     = function(){};
      this.onDrawSign       = function(signContent){};
      this.draw();
    }
  
    draw(){
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("S-RangeSliderMain");
            this.labelElement = new SPLINT.DOMElement.SpanDiv(this.mainElement, "label", this.label);
            this.labelElement.Class("label");

            this.contentBody = new SPLINT.DOMElement(this.id + "contentBody", "div", this.mainElement);
            this.contentBody.Class("contentBody");
                this.sliderBody = new SPLINT.DOMElement(this.id + "sliderBody", "div", this.contentBody);
                this.sliderBody.Class("sliderBody");
                    this.inputElement = new SPLINT.DOMElement(this.id + "slider", "input", this.sliderBody);
                    this.inputElement.type  = "range";
                    this.inputElement.min   = this.min;
                    this.inputElement.max   = this.max;
                    this.inputElement.value = this.value;
                    this.inputElement.step  = this.step;

        if(this.drawValueOutput == true) {
            this.drawValueOutputBack();
        }
        if(this.drawSignOnTop == true){
            this.drawSign();
        }
            this.#events();
    }
    drawValueOutputBack(){
        this.valueElement = new SPLINT.DOMElement.SpanDiv(this.contentBody, "value", this.value + this.valueExtension);
        this.valueElement.Class("valueOutput");
    }
    drawSign(){
        this.signBody = new SPLINT.DOMElement(this.id + "signBody", "div", this.sliderBody);
        this.signBody.Class("signBody");
        this.signBody.parentNode.insertBefore(this.signBody, this.inputElement);
            this.signContent = new SPLINT.DOMElement.SpanDiv(this.signBody, "content", this.value);
            this.signContent.Class("signContent");
        this.updateSign();
    }
    updateSign(){
        if(this.drawSignOnTop == true){
            this.signBody.state().setActive();
            this.onDrawSign(this.signContent);
            this.signBody.style.top = this.sliderBody.offsetTop - this.signBody.offsetHeight + "px";
            this.signBody.style.left = (this.thumbWidth / 2) + this.sliderBody.offsetLeft + (((this.inputElement.offsetWidth - this.thumbWidth)  ) / 100) * this.valuePercent + "px";
        }
    }
    hideSign(){
        this.signBody.state().unsetActive();
    }
    set drawValueOutput(v) {
        this.#_drawValueOuput = v;
        if(v == true){
            this.drawValueOutputBack();
        } else if(this.valueElement != undefined){
            this.valueElement.div.remove();
        }
    }
    get drawValueOutput(){
        return this.#_drawValueOuput;
    }
    set drawSignOnTop(v){
        this.#_drawSignOnTop = v;
        if(v == true){
            this.drawSign();
        } else {
            this.signBody.remove();
        }
    }
    get drawSignOnTop(){
        return this.#_drawSignOnTop;
    }
    set valueExtension(v){
        this.#_valueExtension = v;
        if(this.drawValueOutput){
            this.valueElement.value = this.value + this.#_valueExtension;
        }
    }
    get valueExtension(){
        return this.#_valueExtension;
    }
    set drawDivider(flag){
        if(flag){
            this.mainElement.setAttribute("drawDivider", true);
        } else {
            this.mainElement.removeAttribute("drawDivider");
        }
    }
    set disabled(flag){
        this.#_disabled = flag;
        this.inputElement.disabled = flag;
    }
    get disabled(){
        return this.#_disabled;
    }
    get max(){
        return this.#_max;
    }
    get min(){
        return this.#_min;
    }
    get step(){
        return this.#_step;
    }
    get value(){
        return this.#_value;
    }
    get valuePercent(){
        let dif = Math.abs(this.max - this.min);
        let c = 100 / dif * (this.value - this.min);
        this.#_valuePercent = c;
        return c;
    }
    set max(v){
        this.#_max = v;
        this.inputElement.max = v;
        this.drawTickMarks = this.#_drawTickMarks;
    }
    set min(v){
        this.#_min = v;
        this.inputElement.min = v;
        this.drawTickMarks = this.#_drawTickMarks;
    }
    set step(v){
        this.#_step = v;
        this.inputElement.step = v;
        this.drawTickMarks = this.#_drawTickMarks;
    }
    set value(v){
        this.#_value = v;
        if(this.drawValueOutput){
            this.valueElement.value = v + this.valueExtension;
        }
        if(this.drawSignOnTop){
            this.updateSign();
        }
        this.inputElement.value = v;
    }
    set drawTickMarks(flag){
        this.#_drawTickMarks = flag;
        if(flag){
            this.dataList = new S_DataList(this.name, this.sliderBody);
            let amount = (this.max - this.min) / this.step;
            for(let i = 0; i < amount; i++){
                this.dataList.addOption(i * this.step);
            }
            this.inputElement.setAttribute("list", this.dataList.id);
        } else {
            if(this.dataList != null){
                this.dataList.remove();
                this.dataList = null;
                this.inputElement.removeAttribute("list");
            }
        }
    }
    set label(v){
        this.#_label = v;
        this.labelElement.value = v;
    }
    get label(){
        return this.#_label;
    }
    set showValue(flag){
        if(this.drawValueOutput){
            this.valueElement.hide = !flag;
        }
    }
    #events(){
        this.inputElement.oninput = function(){
            this.value = this.inputElement.value;
            this.oninput(this.value);
        }.bind(this);
        this.inputElement.onmouseup = function(){
            this.oninputFinished(this.value);
        }.bind(this);
        this.inputElement.onmousedown = function(){
            this.oninputStart(this.value);
        }.bind(this);
    }
    get(){
      return this.element;
    }
  }