class S_Button {
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
      this.descSpan = null;
      this.name   = name;
      this.hasIcon = false;
      this._value  = value;
      this.onclick = function(){};
      this.draw();
    }
    set value(v){
        this._value = v;
        this.span.innerHTML = v;
        this.span.classList.remove("material-symbols-outlined");
    }
    get value(){
        return this._value;
    }
    set disabled(v){
        this.setAttribute("disabled", v);
    }
    get disabled(){
        if(this.button.getAttribute("disabled") == "true"){
            return true;
        } else {
            return false;
        }
    }
    setTooltip(value, direction){
        this.button.setTooltip(value, direction);
    }
    Class(className){
        this.button.Class(className);
    }
    /**
     * Set the basic styling
     * @param {SPLINT_constants.BUTTON_STYLES} styleConst
     */
    set basicStyling(styleConst){
        for(const e of Object.values(S_constants.BUTTON_STYLES)){
            this.button.classList.remove(e);
        }
        if(styleConst != null){
            this.button.classList.add(styleConst);
        }
    }
    setStyleTemplate(type){
      if(type == this.STYLE_NONE){
        this.button.classList.remove(this.STYLE_STANDARD);
        this.button.classList.remove(this.STYLE_DEFAULT);
        return;
      }
      switch(type){
        case S_Button.STYLE_DEFAULT : this.button.classList.remove(S_Button.STYLE_STANDARD); break;
        case S_Button.STYLE_STANDARD : this.button.classList.remove(S_Button.STYLE_DEFAULT); break;
        case S_Button.STYLE_NONE : this.button.classList.remove(S_Button.STYLE_DEFAULT); this.button.classList.remove(S_Button.STYLE_STANDARD); break;
      }
      this.button.classList.add(type);
    }
    setStyleTemplate(type){
      if(type == this.STYLE_NONE){
        this.button.classList.remove(this.STYLE_STANDARD);
        this.button.classList.remove(this.STYLE_DEFAULT);
        return;
      }
      switch(type){
        case S_Button.STYLE_DEFAULT : this.button.classList.remove(S_Button.STYLE_STANDARD); break;
        case S_Button.STYLE_STANDARD : this.button.classList.remove(S_Button.STYLE_DEFAULT); break;
        case S_Button.STYLE_NONE : this.button.classList.remove(S_Button.STYLE_DEFAULT); this.button.classList.remove(S_Button.STYLE_STANDARD); break;
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
      this.button = new SPLINT.DOMElement(this.parent.id + "_button_" + this.name, "button", this.parent);
      this.button.Class("button_General");
    //   this.button.ontouchend = function(e){
    //     this.onclick(e);
    //   }.bind(this);
      this.button.onclick = function(e){ 
        this.onclick(e); 
      }.bind(this);
      
        this.span = new SPLINT.DOMElement(this.parent.id + "_span_" + this.name, "span", this.button);
        this.span.innerHTML = this._value;
    }
    bindDropdown(func){
      this.dropdownDiv = new SPLINT.DOMElement(this.parent.id + "_button_" + this.name + "_dropdown", "div", this.button);
      func(this.dropdownDiv);
      this.dropdownDiv.classList.add("dropdown");
        this.dropdownDiv.style.visibility = "hidden";
      
    }
    toggleDropdown(){
      // this.button.style.pointerEvents = "none";
      this.dropdownDiv.style.visibility = "hidden";
      this.button.state().toggle();
      if(this.button.state().isActive()){
        this.dropdownDiv.style.visibility = "visible";
        window.onmousedown = function(event){
          if(!event.target.path().includes(this.button)){
            this.toggleDropdown();
          }
        }.bind(this);
      } else {
        window.onmousedown = function(){}
        this.dropdownDiv.style.visibility = "hidden";
      }
    }
    click(){
        this.button.click();
    }
    bindIcon(IconName, Class){
        this.hasIcon = true;
      this.span.bindIcon(IconName, Class);
    }
    set Description(value){
        if(!this.hasIcon){
            console.error("no icon set");
            return false;
        }
        if(value == null){
            if(this.descSpan != null){
                this.descSpan.remove();
            }
            return true;
        }
        if(this.descSpan == null){
            this.descSpan = new SPLINT.DOMElement(this.parent.id + "_descSpan_" + this.name, "span", this.button);
            this.descSpan.Class("description");
        }
        this.descSpan.innerHTML = value;
    }
    get Description(){
        if(!this.hasIcon){
            console.error("no icon set");
            return false;
        }
        if(this.descSpan != null){
            return this.descSpan.innerHTML;
        }
        return null;
    }
    removeIcon(IconName){
        this.Description = null;
        this.hasIcon = false;
      this.span.removeIcon(IconName);
    }
    setAttribute(name, value){
      this.button.setAttribute(name, value);
    }
    static get Radio(){
        SPLINT.getClass("S_radioButton", "buttonRadio");
        return S_radioButton;
    }
    static get Switch(){
        SPLINT.getClass("S_switchButton", "buttonSwitch");
        return S_switchButton;
    }
    static get Toggle(){
        SPLINT.getClass("S_toggleButton", "buttonToggle");
        return S_toggleButton;
    }
    static get Toggle2(){
        SPLINT.getClass("nS_ToggleButton", "buttonToggle2");
        return nS_ToggleButton;
    }
    static get Choice(){
        SPLINT.getClass("S_ChoiceButton", "buttonChoice");
        return S_ChoiceButton;
    }
    static get FileUpload(){
        SPLINT.getClass("FileUploadButton_S", "buttonFileUpload");
        return FileUploadButton_S;
    }
  }