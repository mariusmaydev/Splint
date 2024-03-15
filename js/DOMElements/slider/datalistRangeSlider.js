

class S_datalistRangeSlider {
    #_label;
    #_value             = 0;
    #_disabled          = false;
    #_drawTickMarks     = false;
    #_valueExtension    = "";
    #_drawSignOnTop     = true;
    #_drawValueOuput    = false;
    #_valuePercent      = 0;

    constructor(parent, name, listArray = null, label = ""){
      this.id           = "S-RangeSlider__" + name + "__";
      this.parent       = parent;
      this.name         = name;
      this.index        = 0; 
      this.#_label      = label;
      this.dataList    = listArray;
    //   this.dataList     = null;
      this.thumbWidth   = 16;
      this.dataListID = "values";
      this.oninput          = function(value){};
      this.oninputFinished  = function(value){};
      this.oninputStart     = function(){};
      this.onDrawSign       = function(signContent){};
      this.updateDataList   = function(){};
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("S-RangeSliderMain");
      if(listArray != null){
        this.draw();
      }
    }
  
    draw(){
            this.labelElement = new SPLINT.DOMElement.SpanDiv(this.mainElement, "label", this.label);
            this.labelElement.Class("label");

            this.contentBody = new SPLINT.DOMElement(this.id + "contentBody", "div", this.mainElement);
            this.contentBody.Class("contentBody");
                this.sliderBody = new SPLINT.DOMElement(this.id + "sliderBody", "div", this.contentBody);
                this.sliderBody.Class("sliderBody");
                    this.drawDataList();
                    this.inputElement = new SPLINT.DOMElement(this.id + "slider", "input", this.sliderBody);
                    this.inputElement.type  = "range";
                    this.inputElement.min = 0;
                    this.inputElement.max = this.dataList.length - 1;
                    this.inputElement.step = 1;
                    this.inputElement.setAttribute("list", this.dataListID);
        if(this.drawSignOnTop == true){
            this.drawSign();
        }
        this.#events();
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
        if(this.drawSignOnTop == true && this.signBody != undefined){
            this.signBody.state().setActive();
            this.onDrawSign(this.signContent);
            this.signBody.style.top = this.sliderBody.offsetTop - this.signBody.offsetHeight + "px";
            this.signBody.style.left = (this.thumbWidth / 2) + this.sliderBody.offsetLeft + (((this.inputElement.offsetWidth - this.thumbWidth)  ) / 100) * this.valuePercent + "px";
        }
    }
    hideSign(){
        if(this.signBody != undefined){
        this.signBody.state().unsetActive();

        }
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
    get value(){
        return this.#_value;
    }
    get valuePercent(){
        let dif = this.dataList.length - 1;
        let c = 100 / dif * (this.index - 0);
        this.#_valuePercent = c;
        return c;
    }
    drawDataList(){
        this.dataListElement = new SPLINT.DOMElement(this.dataListID, "datalist", document.body);
        this.dataListElement.clear();
        for(const i in this.dataList) {
            let ele = this.dataList[i];
            let option = document.createElement("option");//new SPLINT.DOMElement(null, "option", this.dataListElement);
                option.setAttribute("value", ele.value);
                option.setAttribute("label", ele.label);
                option.innerHTML = i;
                this.dataListElement.appendChild(option);
        }
    }
    set value(v){
        this.#_value = v;
        if(this.inputElement != undefined){
            for(const i in this.dataList){
                let ele = this.dataList[i];
                if(ele.value == v){
                    this.inputElement.value = i;
                    this.index = i;
                }
            }
        }
        if(this.drawSignOnTop){
            this.updateSign();
        }
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
            // if(this.dataList != null){
            //     this.dataList.remove();
            //     this.dataList = null;
            //     this.inputElement.removeAttribute("list");
            // }
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
            this.value = this.dataList[this.inputElement.value].value;
            this.index = this.inputElement.value;
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