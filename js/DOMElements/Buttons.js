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