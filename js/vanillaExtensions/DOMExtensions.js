  
    class SPLINT_DOMextensions {
        constructor(instance){
            this.instance = instance;
        } 
        #state_c = null;
        get state(){
            let c = class {
                constructor(instance){
                    this.instance = instance;
                }
                #func_onActive = function(){};
                #func_onPassive = function(){};
                #func_onToggle = function(){};
                get(){
                    if(this.instance.getAttribute("s-state") == "active"){
                        return "active";
                    } else {
                        return "passive";
                    }
                }
                remove(){
                    if(this.instance.getAttribute("s-state") != null){
                        this.instance.removeAttribute("s-state");
                    }
                }
                toggle(){
                    if(this.instance.getAttribute("s-state") == "active"){
                        this.setPassive();
                    } else {
                        this.setActive();
                    }
                }
                setActive(){
                    this.instance.setAttribute("s-state", "active");
                    this.instance.state = "active";
                    this.#onToggle("e", "active")
                }
                setPassive(){
                    this.instance.setAttribute("s-state", "passive");
                    this.instance.state = "passive";
                    this.#onToggle("e", "passive")
                }
                #onToggle(e, state){
                    if(state == "active"){
                        this.#func_onActive(...arguments);
                    } else {
                        this.#func_onPassive(...arguments);
                    }
                    this.#func_onToggle(...arguments);
                }
                get onActive(){
                    return this.#func_onActive;
                }
                set onActive(func){
                    this.#func_onActive = func;
                }
                get onPassive(){
                    return this.#func_onPassive;
                }
                set onPassive(func){
                    this.#func_onPassive = func;
                }
                set onToggle(func){
                    this.#func_onToggle = func;
                    // this.instance.S_NonStateChange = this.#onToggle.bind(this);
                }
            }
            if(this.#state_c == null){
                this.#state_c = new c(this.instance);
            }
            return this.#state_c;
        }   
    }
    
    Object.defineProperty(HTMLElement.prototype, "SPLINT", {
        get: function(){
            if(this.SPLINT_STORAGE == undefined || this.SPLINT_STORAGE == null){
                this.SPLINT_STORAGE = new SPLINT_DOMextensions(this);
            }
            return this.SPLINT_STORAGE;
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(HTMLElement.prototype, "S", {
        get: function(){
            if(this.SPLINT_STORAGE == undefined || this.SPLINT_STORAGE == null){
                this.SPLINT_STORAGE = new SPLINT_DOMextensions(this);
            }
            return this.SPLINT_STORAGE;
        },
        enumerable: false,
        configurable: true
    })
  //----------------------------------------------------------------
  //Erweiterungen für alle DOMElemente
  //----------------------------------------------------------------

  HTMLElement.prototype.getAbsoluteWidth = function () {
      let styles = window.getComputedStyle(this);
      let margin = parseFloat(styles['marginLeft']) +
                  parseFloat(styles['marginRight']);

      return Math.ceil(this.offsetWidth + margin);
    }
    
  HTMLElement.prototype.getAbsoluteHeight = function () {
      let styles = window.getComputedStyle(this);
      let margin = parseFloat(styles['marginTop']) +
                   parseFloat(styles['marginBottom']);
  
      return Math.ceil(this.offsetHeight + margin);
    }

  HTMLElement.prototype.queryChildren = function(queryObject, FLAG_all = true){
    function func(element, queryArray, FLAG_all, callback = function(){}){
      if(element.children == undefined){
          return false;
      }
      
      for(const child of element.children){
        if(FLAG_all){
          for(const param of queryArray){
            if(child[param[0]] != param[1]){
              func(child, queryArray, FLAG_all, callback);
              return false;
            }
          }
          callback(child);
          return true;
        } else {
          for(const param of queryArray){
            if(child[param[0]] == param[1]){
              callback(child);
              return true;
            }
          }
        }
        func(child, queryArray, FLAG_all, callback);
        return false;
      }
      return false;
    }
    let element = null;
    let queryArray = Object.entries(queryObject);
    func(this, queryArray, FLAG_all, function(child){
      element = child;
    });
    return element;
  }
  // HTMLElement.prototype.getChildByClassName = function(className){
  //   function func(element, className, callback = function(){}){
  //     if(element.children == undefined){
  //         return false;
  //     }
  //     for(const child of element.children){
  //         if(child.className == className){
  //             callback(child);
  //             return true;
  //         } else {
  //             func(child, className, callback);
  //         }
  //     }
  //     return false;
  //   }
  //   let element = null;
  //   func(this, className, function(child){
  //     element = child;
  //   });
  //   return element;
  // }

  HTMLElement.prototype.getElementBefore = function(){
    return this.previousElementSibling;
  }
  HTMLElement.prototype.getElementAfter = function(){
    return this.nextElementSibling;
  }

    HTMLElement.prototype.startAnimation = function(name = "testA", duration = 1, timingFunction = "ease", delay = 0, iterationCount = 1, direction = "normal"){
        this.style.animation = name + " " + duration + "s " + timingFunction + " " + delay + "s " + iterationCount + " " +  direction;
        return new Promise(async function(resolve){
            if(typeof iterationCount == 'number'){
                setTimeout(function(){
                    this.style.animation = "";
                    resolve(this.style.animation);
                }.bind(this), (iterationCount * duration * 1000));
            } else {
                resolve(this.style.animation);
            }
        }.bind(this));
    } 
    HTMLElement.prototype.startAnimation_str = function(str, duration, delay = 0){
        this.style.animation = str;
        return new Promise(async function(resolve){
            setTimeout(function(){
                this.style.animation = "";
                resolve(this.style.animation);
            }.bind(this), (delay + duration) * 1000);
        }.bind(this));
    } 
  HTMLElement.prototype.setTooltip = function(value, direction){
    return new Tooltip_S(value, direction, this);
  }
//   HTMLElement.prototype.clear = function(element){
//     for(let i = 0; i < this.childNodes.length; i++){
//       if(this.childNodes[i] != element){
//         this.childNodes[i].remove();
//       }
//     }
//   }
  HTMLElement.prototype.disable = function(type){
    this.setAttribute(type, "");
  }
  HTMLElement.prototype.SPLINT = {
    get() {
      return new SPLINT_DOMextensions(this);
    }, 
    set(v){
      val = v;
    },
    enumerable: true,
    configurable: true,
  }
// Object.defineProperty(HTMLElement.prototype, "SPLINT",  {
//   /** @this {ObjThis}*/
//   get() {
//     return new SPLINT_DOMextensions(this);
//   }, 
//   /** @this {ObjThis}*/
//   set(v){
//     val = v;
//   },
//   enumerable: true,
//   configurable: true,
// });

HTMLElement.prototype.newChild = function(name, tag, oncreate = function(){}){
  return new SPLINT.DOMElement(this.id + name, tag, this, oncreate)
}
  /**
   * 
   * @param {string} id_or_name 
   * @param {string} Class 
   * @returns 
   * 
   * @example 
   * id_or_name = "/ID/<name>"
   * element.id -> "<parent.id>_<name>"
   * id_or_name = "<name>"
   * element.id -> "<name>"
   * id_or_name = null
   * element.id -> "<parent.id>_<uniqueID>"
   */
    HTMLElement.prototype.newDiv = function(id_or_name = null, Class = null){
        let f_id = "";
        if(id_or_name != null){
          if(id_or_name.includes("/ID/")){
            f_id = this.id + "_" + id_or_name.replace("/ID/", "");
          } else {
            f_id = id_or_name;
          }
        } else {
            f_id = this.id + "_/UID()/";
        }
        let ele = new SPLINT.DOMElement(f_id, "div", this);
            if(Class != null){
                ele.Class(Class);
            }
        return ele;
    }

  HTMLElement.prototype.hasParentWithID = function(ID){
    let ele = this;
    do {
      if(ele.id.includes(ID)){
        return true;
      }
      ele = ele.parentNode;
    } while(ele.parentNode != null){
    }
    return false;
  }

  HTMLElement.prototype.hasParentWithClass = function(CSS_class){
    let ele = this;
    do {
      if(ele.classList.contains(CSS_class)){
        return true;
      }
      ele = ele.parentNode;
    } while(ele.parentNode != null){
    }
    // if(!this.classList.contains("expander") && !this.parentNode.classList.contains("expander")){
    //     if(!this.id.includes("copy")){
    //       return true;
    //     }
    // }
    return false;
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
      this.innerHTML = "";
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
  // HTMLElement.prototype.onEnter = function(keyEvent = "keyup"){
  //   function obj(element){
  //     element.getTrigger   = function(triggerElement, keyEvent){
  //       triggerElement.addEventListener(keyEvent, function(event){
  //         if(event.key === 'Enter'){
  //           event.preventDefault();
  //           triggerElement.click();
  //           RemoveEnterListener(triggerElement);
  //         }
  //       });
  //     };
  //     this.getValue     = function(valueElement){
  //       valueElement.addEventListener(keyEvent, function(event){
  //         if(event.key === 'Enter'){
  //           event.preventDefault();
  //           element.click();
  //           RemoveEnterListener(element);
  //         }
  //       });
  //     }
  //   }
  //   return new obj(this, keyEvent);
  // }
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
  HTMLElement.prototype.bindIcon = function(IconName, ...ClassName){
    if(this.tagName == "SPAN"){
      this.innerHTML = IconName;
      if(ClassName[0] != undefined){
        this.classList.add(ClassName);
      }
      this.classList.add("material-symbols-outlined");
    }
  }

  HTMLElement.prototype.removeIcon = function(IconName){
    if(this.tagName == "SPAN"){
      this.innerHTML = IconName;
      this.classList.forEach(Class => {
        if(Class.includes("material-symbols-outlined")){
          this.classList.remove(Class);
        }
      });
    }
  }
