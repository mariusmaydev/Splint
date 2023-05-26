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
      this.name   = name;
      this.value  = value;
      this.onclick = function(){};
      this.draw();
    }
    setTooltip(value, direction){
        this.button.setTooltip(value, direction);
    }
    Class(className){
        this.button.Class(className);
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
      this.button.onclick = function(e){ 
        this.onclick(e); 
      }.bind(this);
      
        this.span = new SPLINT.DOMElement(this.parent.id + "_span_" + this.name, "span", this.button);
        this.span.innerHTML = this.value;
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
      this.span.bindIcon(IconName, Class);
    }
    removeIcon(IconName){
      this.span.removeIcon(IconName);
    }
    setAttribute(name, value){
      this.button.setAttribute(name, value);
    }
    static get Radio(){
      return S_radioButton;
    }
    static get Switch(){
      return S_switchButton;
    }
    static get Toggle(){
      return S_toggleButton;
    }
    static get Toggle2(){
        return nS_ToggleButton;
    }
  }