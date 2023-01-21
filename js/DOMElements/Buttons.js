  class Button {
    static STYLE_DEFAULT  = "button_Default";
    static STYLE_STANDARD = "button_General";
    static STYLE_NONE     = "NONE";

    constructor(parent, name, value = ""){
      if(typeof parent == 'object'){
        this.parent = parent;
      } else if(typeof parent == 'string') {
        this.parent = document.getElementById(parent);
      } else {
        console.error("wrong parentElement <new Button>");
      }
      this.name   = name;
      this.value  = value;
      this.onclick = function(){};
      this.draw();
    }
    setStyleTemplate(type){
      if(type == this.STYLE_NONE){
        this.button.classList.remove(this.STYLE_STANDARD);
        this.button.classList.remove(this.STYLE_DEFAULT);
        return;
      }
      switch(type){
        case Button.STYLE_DEFAULT : this.button.classList.remove(Button.STYLE_STANDARD); break;
        case Button.STYLE_STANDARD : this.button.classList.remove(Button.STYLE_DEFAULT); break;
        case Button.STYLE_NONE : this.button.classList.remove(Button.STYLE_DEFAULT); this.button.classList.remove(Button.STYLE_STANDARD); break;
      }
      this.button.classList.add(type);
    }
    disableStandard(disable = true){
      if(disable){
        this.button.classList.remove("button_General");
      } else {
        this.button.classList.add("button_General");
      }
    }
    draw(){
      this.button = new DOMElement(this.parent.id + "_button_" + this.name, "button", this.parent);
      this.button.Class("button_General");
      this.button.onclick = function(e){ 
        this.onclick(e); 
      }.bind(this);
      
        this.span = new DOMElement(this.parent.id + "_span_" + this.name, "span", this.button);
        this.span.innerHTML = this.value;
    }
    bindDropdown(func){
      this.dropdownDiv = new DOMElement(this.parent.id + "_button_" + this.name + "_dropdown", "div", this.button);
      func(this.dropdownDiv);
      this.dropdownDiv.classList.add("dropdown");
        this.dropdownDiv.style.visibility = "hidden";
      
    }
    toggleDropdown(){
      this.button.tooltip.hide();
      this.button.state().toggle();
      if(this.button.state().isActive()){
        this.dropdownDiv.style.visibility = "visible";
        window.onmousedown = function(event){
          if(!event.target.path().includes(this.button)){
            this.toggleDropdown();
          }
        }.bind(this);
      } else {
        this.button.tooltip.unhide();
        window.onmousedown = function(){}
        this.dropdownDiv.style.visibility = "hidden";
      }
    }
    bindIcon(IconName, Class){
      this.span.bindIcon(IconName, Class);
    }
    removeIcon(IconName){
      this.span.removeIcon(IconName);
    }
    setAttribute(name, value){
      this.button.setAttribute(name, value);
    }
  }

  class switchButton extends Button {
    constructor(parent, name, value, extended = false){
      super(parent, name, value);
      this.extended = extended;
      this.parent = parent;
      this.id     = name + "_switchButton_";
      this.onchange   = function(){};
      this.onactive   = function(){};
      this.onpassive  = function(){};
      this.onMouseEnter = function(){};
      this.onMouseLeave = function(){};
      this.drawSwitch();
    }  
    setActive(){
      this.button.state().setActive();
      this.onactive();
    }
    unsetActive(){
      this.button.state().unsetActive();
      this.onpassive();
    }
    toggle(){
      if(this.button.state().isActive()){
        this.unsetActive();
      } else {
        this.setActive();
      }
    }
    drawSwitch(){
      this.button.onclick = function(){
        this.toggle();
        this.onchange(this.button.state().get());
      }.bind(this);
      if(this.extended){
        this.button.onmouseenter = function(){
          this.toggle();
          this.onMouseEnter(this.button.state().get());
        }.bind(this);
    
        this.button.onmouseleave = function(){
          this.toggle();
          this.onMouseLeave(this.button.state().get());
        }.bind(this);
      }
    }
  }

  class FileUploadButton_S extends Button {
    constructor(parent, name, accept, type, path2php){
      super(parent, name);
      this.parent = parent;
      this.name   = name;
      this.accept = accept;
      this.type   = type;
      this.path2php   = path2php;
      this.onsuccess = function(data){};
      this.id     = "ImageUpload_" + name;
      this.#draw();
    }
    preventDirect(){
      this.#draw(true);
    }
    get FileData(){
      return this.file_data;
    }
    #draw(preventDirect = false){
      this.input = new DOMElement(this.id + "_input", "input", this.parent);
      this.input.type = "file";
      this.input.accept = this.accept;
      this.input.name = "inputfile";
      this.input.oninput = function(){
            let fileupload = new FileUpload_S(this.path2php);
            if(preventDirect){
              this.file_data = FileUpload_S.getFileData(this.input);
            } else {
              fileupload.direct(this.input, this.type, this.onsuccess);
            }
            // UploadDirect(this.input);
            this.input.clear();
          }.bind(this);
    
      this.button.onclick = function(){
            this.input.click();
          }.bind(this);
    }
  }

  class radioButton_C extends Button {
    constructor(parent, name){
      super(parent, name);
      this.id   = parent.id + "_radioButton_" + name + "_";
      this.name = name;
      this.parent = parent;
      this.data = [];
      this.lineFlag = true;
      this.preventLines = false;
      this.headline = null;
      this.onChange = function(e){};
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("RadioButton");
      this.button.remove();
    }
    get dataObj(){
      function obj(instance){
        this.add = function(id, name, dataIn){
          let data = new Object();
              data.id   = id;
              data.name = name;
              data.data = dataIn;
          instance.data.push(data);
        }
      }
      return new obj(this);
    }
    get Value(){
      return $(`input[name="${CSS.escape(this.name)}"]:checked`).val();
    }
    get headline_ele(){
      return this.headline;
    }
    setValue(value){
      if(value != null && value != false){
        $(`input[name="${CSS.escape(this.name)}"]`).filter("[value='" + value + "']").prop('checked', true);
        $(`div[name="${CSS.escape(this.name)}"]`).filter("[value='" + value + "']").attr('state', 'active');
      }
    }
    Headline(str){
      this.headline = str;
    }
    drawRadio(){
      if(this.headline != null){
        this.headline = new spanDiv(this.mainElement, "headline", this.headline);
        this.headline.div.Class("radio_headline");
      }
      let radioDiv = new DOMElement(this.id + "_RadioDiv", "div", this.mainElement);
      for(let i = 0; i < this.data.length; i++){
        if(this.lineFlag){
          new HorizontalLine(radioDiv);
        } else {
          this.lineFlag = true;
        }
        let data = this.data[i];
        let inputDiv = new DOMElement(this.id + "inputDiv_" + i, "div", radioDiv);
            inputDiv.onclick = function(){
              input.click();
            }
            let input = new DOMElement(this.id + "input_" + i, "input", inputDiv);
                input.setAttribute("type", "radio");
                input.setAttribute("name", this.name);
                input.checked = true;
                input.value = data.id;
            let labelDiv = new DOMElement(parent.id + "_radioButtonLabelDiv_" + this.name + "_" + i, "div", inputDiv.id);
                let span0 = new spanDiv(labelDiv, "span0", data.name);
                labelDiv.setAttribute("value", data.id);
                labelDiv.setAttribute("state", "passive");
                labelDiv.setAttribute("name", this.name);
                if(data.data != undefined){
                  let span1 = new spanDiv(labelDiv, "span1", data.data);
                }
            if(data.price != undefined){
              let price = new priceDiv(inputDiv, data.price);
            }
            let displayDiv = new DOMElement(parent.id + "_radioButtonDisplayDiv_" + this.name + "_" + i, "div", labelDiv.id);
                displayDiv.setAttribute("name", this.name + "_display");
                displayDiv.setAttribute("value", data.id);

      }
      $(`input[type="radio"][name="${CSS.escape(this.name)}"]`).on('change', function(e) {
        $(`div[name="${CSS.escape(this.name)}"]`).attr('state', 'passive');
        $(`div[name="${CSS.escape(this.name)}"]`).filter("[value='" + e.currentTarget.value + "']").attr('state', 'active');
        // console.log(e);
        this.onChange(e);
      }.bind(this));
    }
    getDisplayDiv(value){
      return $(`div[name="${CSS.escape(this.name + "_display")}"]`).filter("[value='" + value + "']")[0];
    }
  }
