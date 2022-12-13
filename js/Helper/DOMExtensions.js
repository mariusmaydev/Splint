  //----------------------------------------------------------------
  //Erweiterungen für alle DOMElemente
  //----------------------------------------------------------------
  
  HTMLElement.prototype.setTooltip = function(value, direction){
    this.tooltip = new Tooltip(this, value, direction);
  }
  HTMLElement.prototype.Class = function(...names){
    function obj(instance, ...names){
      if(names.length > 0 && names[0] != undefined){
        instance.classList.add(names);
        this.set = function(){
          instance.className = "";
          instance.classList.add(names);
        }
        this.remove = function(){
          instance.classList.remove(names);
        }
      } else if(instance.classList.length == 0){
        instance.removeAttribute("class");
      }
    }
    return new obj(this, names);
  }
  HTMLElement.prototype.clear = function(element){
    if(element == true){
      this.innerHTML = "";
      return;
    } else {
      for(let i = 0; i < this.childNodes.length; i++){
        if(this.childNodes[i] != element){
          this.childNodes[i].remove();
        }
      }
    }
  }
  HTMLElement.prototype.state = function(){
      this.get = function(){
        if(this.hasAttribute("state")){
          return this.getAttribute("state");
        } else {
          return false;
        }
      }
      this.has = function(){
        return this.hasAttribute("state")
      }
      this.isActive = function(){
        if(this.hasAttribute("state") && this.getAttribute("state") == "active"){
          return true;
        } else {
          return false;
        }
      }
      this.setActive = function(){
        this.dispatchEvent(SPLINT_EVENTS.onStateChange);
        this.setAttribute("state", "active");
      }
      this.unsetActive = function(){
        this.dispatchEvent(SPLINT_EVENTS.onStateChange);
        this.setAttribute("state", "passive");
      }
      this.toggle = function(){
        if(this.hasAttribute("state") && this.getAttribute("state") == "active"){
          this.state().unsetActive();
        } else {
          this.state().setActive();
        }
      }
      return this;
  }
  HTMLElement.prototype.disable = function(type){
    this.setAttribute(type, "");
  }
  HTMLElement.prototype.onEnter = function(keyEvent = "keyup"){
    function obj(element){
      element.getTrigger   = function(triggerElement, keyEvent){
        triggerElement.addEventListener(keyEvent, function(event){
          if(event.key === 'Enter'){
            event.preventDefault();
            triggerElement.click();
            RemoveEnterListener(triggerElement);
          }
        });
      };
      this.getValue     = function(valueElement){
        valueElement.addEventListener(keyEvent, function(event){
          if(event.key === 'Enter'){
            event.preventDefault();
            element.click();
            RemoveEnterListener(element);
          }
        });
      }
    }
    return new obj(this, keyEvent);
  }
  HTMLElement.prototype.path = function(){
    if(this.Path == undefined){
      element = this;
      this.Path = [];
      while(element.parentNode != null){
        this.Path.push(element.parentNode);
        element = element.parentNode;
      }
    }
    return this.Path;
  }
  HTMLElement.prototype.delete = function(){
    this.innerHTML = "";
    this.parentNode.removeChild(this);
  }
  HTMLElement.prototype.getScrollHeight = function(){
    let a = this.scrollTop;
    let b = this.scrollHeight - this.clientHeight;
    let c = a / b;
    return Math.round(c*100) / 100;
  }
  HTMLElement.prototype.before = function(elementAfter){
    elementAfter.parentNode.insertBefore(this, elementAfter);
  }
