class Slider {
    constructor(id, parent, name, min, max, val){
      this.id = id;
      this.parent = parent;
      this.name = name;
      this.min = min;
      this.max = max;
      this.val = val;
      this.scale = new Object();
      this.scale.big = new Object();
      this.scale.big.percent  = 0;
      this.scale.big.absolute = 0;
      this.scale.small = new Object();
      this.scale.small.percent  = 0;
      this.scale.small.absolute = 0;
      this.element = new Object();
      this.moveSign = true;
    }
  
    draw(){
      this.element.div = new spanDiv(this.parent, "slider_div_" + this.name, "Label");
      this.element.div.Class("SliderMain").set();
      if(this.moveSign){
        this.element.div.Class("static").remove();
      } else {
        this.element.div.Class("static").add();
      }
      this.drawSign();
        this.element.sliderDiv = new DOMElement(this.id + "_sliderDiv", "div", this.element.div.div);
        this.element.sliderDiv.Class("ScaleDiv");
          this.element.slider = new DOMElement(this.id + "_slider", "input", this.element.sliderDiv);
          this.element.slider.type = "range";
          this.element.slider.min = this.min;
          this.element.slider.max = this.max;
          this.element.slider.setAttribute("value", this.val);
  
          let slider    = this.element.slider;
          let sliderDiv = this.element.sliderDiv;
          let sign      = this.element.sign.div;
  
          if(this.moveSign){
            sign.style.left = sliderDiv.offsetLeft + (((slider.offsetWidth) - (sign.offsetWidth) ) / 100) * this.val + "px";
          }
          this.element.slider.oninput = function(){
            this.val  = slider.value;
            this.element.sign.setValue(this.val);
            if(this.moveSign){
              this.element.sign.div.style.left =  sliderDiv.offsetLeft + (((slider.offsetWidth) - (sign.offsetWidth) ) / 100) * this.val + "px";
            }
          }.bind(this);
  
        if(this.event != undefined){
          this.element.slider.addEventListener(this.event, this.func.bind(this));
        }
        this.#calcScale();
    }
    get(){
      return this.element;
    }
    setScale(type = "small"){
      function obj(instance, type){
        instance.scale[type] = new Object();
        this.percent = function(value){
          instance.scale[type].absolute = 0;
          instance.scale[type].percent = value;
        }
        this.absolute = function(value){
          instance.scale[type].percent  = 0;
          instance.scale[type].absolute = value;
        }
      }
      return new obj(this, type);
    }
    #calcScale(){
      let countS, countB;
      if(typeof this.scale != 'object'){
        return;
      } else {
        if(typeof this.scale.small == 'object'){
          if(this.scale.small.absolute != undefined && this.scale.small.absolute != 0){
            countS = this.scale.small.absolute - 1;
          } else if(this.scale.small.percent != undefined && this.scale.small.percent != 0){
            countS = 100 / this.scale.small.percent;
          }
        }
        if(typeof this.scale.big == 'object'){
          if(this.scale.big.absolute != undefined && this.scale.big.absolute != 0){
            countB = this.scale.big.absolute - 1;
          } else if(this.scale.big.percent != undefined && this.scale.big.percent != 0){
            countB = 100 / this.scale.big.percent;
          }
        }
      }
      let slider  = this.element.slider;
      let scaleDiv = new DOMElement(this.id + "sliderScaleDiv", "div", this.element.sliderDiv);
      for(let i = 0; i <= countS; i++){
        let ele = new DOMElement(scaleDiv.id + "_vl_" + i, "hr", scaleDiv);
            ele.Class("HR");
            if((i) % countB == 0 ){
                ele.classList.add("long");
            }
      }
    }
    setLabel(label){
      this.element.div.setValue(label);
    }
    drawSign(value){
      this.element.sign = new spanDiv(this.element.div.div, "sign", this.val);
      this.element.sign.Class("Sign").set();
    }
    Attr(min, max, val){
      this.min = min;
      this.max = max;
      this.val = val;
    }
    onEvent(event, func){
      this.event = event;
      this.func = func;
      this.draw();
    }
  }