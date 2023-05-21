class Slider_S {
  constructor(parent, name, signFlag = true){
    this.parent = parent;
    this.signFlag = signFlag;
    this.name = name;
    this.val  = 10;
    this.min  = 0;
    this.max  = 0;
    this.step = 1;
    this.id = "Slider_" + name + "_";
    this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
    this.mainElement.Class("Slider_main");
  }
  events(){
    this.oninput = function(){};
    this.inputElement.oninput = function(e){
      this.oninput(e);
      this.signElement.setValue(this.inputElement.value);
    }.bind(this);
  }
  draw(separators = true){

      this.inputBody = new SPLINT.DOMElement(this.id + "inputBody", "div", this.mainElement);
      this.inputBody.Class("Slider_inputBody");
      this.inputBody.style = "--size:" + this.max;
        this.inputElement = new SPLINT.DOMElement(this.id + "input", "input", this.inputBody);
        this.inputElement.Class("Slider_input");
        this.inputElement.type  = "range";
        this.inputElement.min   = this.min;
        this.inputElement.max   = this.max;
        this.inputElement.step  = this.step;
        this.inputElement.setAttribute("value", this.val);
        if(this.signFlag){
          this.signElement = new SPLINT.DOMElement.SpanDiv(this.inputBody, "sign", this.inputElement.value);
          this.signElement.Class("sign");
        }

        if(separators){
          for(let i = this.min; i <= this.max; i += this.step){
            let sep = new SPLINT.DOMElement.HorizontalLine(this.inputBody);
                sep.style = "--index:" + i;
          }
        }
        this.events();
  }
  get value(){
    return this.inputElement.value;
  }
  set value(val){
    this.val = val;
    if(this.inputElement != undefined){
      this.inputElement.value = val;
    }
  }

  setLabel(text){
    this.label = new Label(this.mainElement, this.inputBody, text);
    this.label.before();
  }
}


class Slider {
    #_label;
    #_min               = 0;
    #_max               = 10;
    #_step              = 1;
    #_value             = 5;
    #_disabled          = false;
    #_drawTickMarks     = false;
    #_valueExtension    = "";

    constructor(parent, name, label = ""){
      this.id       = "S-Slider__" + name + "__";
      this.parent   = parent;
      this.name     = name;
      this.#_label  = label;
      this.dataList = null;
      this.oninput          = function(value){};
      this.oninputFinished  = function(value){};
      this.oninputStart     = function(){};
      this.draw();
    }
  
    draw(){
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("S-SliderMain");
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

                this.valueElement = new SPLINT.DOMElement.SpanDiv(this.contentBody, "value", this.value + this.valueExtension);
                this.valueElement.Class("valueOutput");
            this.#events();
    //   this.element.div = new spanDiv(this.parent, "slider_div_" + this.name, "Label");
    //   this.element.div.Class("SliderMain").set();
    //   if(this.moveSign){
    //     this.element.div.Class("static").remove();
    //   } else {
    //     this.element.div.Class("static").add();
    //   }
    //   this.drawSign();
    //     this.element.sliderDiv = new SPLINT.DOMElement(this.id + "_sliderDiv", "div", this.element.div.div);
    //     this.element.sliderDiv.Class("ScaleDiv");
    //       this.element.slider = new SPLINT.DOMElement(this.id + "_slider", "input", this.element.sliderDiv);
    //       this.element.slider.type = "range";
    //       this.element.slider.min = this.min;
    //       this.element.slider.max = this.max;
    //       this.element.slider.setAttribute("value", this.val);
  
    //       let slider    = this.element.slider;
    //       let sliderDiv = this.element.sliderDiv;
    //       let sign      = this.element.sign.div;
  
    //       if(this.moveSign){
    //         sign.style.left = sliderDiv.offsetLeft + (((slider.offsetWidth) - (sign.offsetWidth) ) / 100) * this.val + "px";
    //       }
    //       this.element.slider.oninput = function(){
    //         this.val  = slider.value;
    //         this.element.sign.setValue(this.val);
    //         if(this.moveSign){
    //           this.element.sign.div.style.left =  sliderDiv.offsetLeft + (((slider.offsetWidth) - (sign.offsetWidth) ) / 100) * this.val + "px";
    //         }
    //       }.bind(this);
  
    //     if(this.event != undefined){
    //       this.element.slider.addEventListener(this.event, this.func.bind(this));
    //     }
    //     this.#calcScale();
    }
    set valueExtension(v){
        this.#_valueExtension = v;
        this.valueElement.value = this.value + this.#_valueExtension;
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
        this.valueElement.value = v + this.valueExtension;
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
        this.valueElement.hide = !flag;
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