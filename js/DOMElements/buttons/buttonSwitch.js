SPLINT.require('@SPLINT_ROOT/DOMElements/buttons/button.js');

class S_switchButton extends S_Button {
    constructor(parent, name, value, extended = false){
      super(parent, name, value);
      this.extended = extended;
      this.parent = parent;
      this.id     = parent.id + "_" + name + "_switchButton_";
      this.onchange   = function(){};
      this.onactive   = function(){};
      this.onpassive  = function(){};
      this.onMouseEnter = function(){};
      this.onMouseLeave = function(){};
      this.drawSwitch();
      this.button.Class("switchButton");
    }  
    Class(className){
      this.button.Class(className);
    }
    disableStandardSwitch(){
      this.button.classList.remove("switchButton");
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