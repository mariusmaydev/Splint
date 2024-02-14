
var SPLINT_EVENTS = new Object();

SPLINT_EVENTS.onStateChange       = new CustomEvent("S_onStateChange");
SPLINT_EVENTS.NonStateChange       = new CustomEvent("S_NonStateChange");
SPLINT_EVENTS.toModule            = new CustomEvent("S_toModule");
SPLINT_EVENTS.toCommonJS          = new CustomEvent("S_toCommonJS");
SPLINT_EVENTS.loadedCompletely    = new CustomEvent("S_loadedCompletely");

//Neuer prototype für DOM

Object.defineProperty(HTMLElement.prototype, 'S_onStateChange', {
  set: function(func){
    this.addEventListener("S_onStateChange", function(e){
      func(e, this.state().get());
    });
  }
});

Object.defineProperty(HTMLElement.prototype, 'S_NonStateChange', {
    set: function(func){
      this.addEventListener("S_NonStateChange", function(e){
        func(e, this.getAttribute("s-state"));
      });
    }
  });

Object.defineProperty(HTMLElement.prototype, 'S_toModule', {
  set: function(func){
    this.addEventListener("S_toModule", function(e){
      func(e, this.Storage, this.getAttribute("LighterData"));
    });
  }
});

Object.defineProperty(HTMLElement.prototype, 'S_toCommonJS', {
  set: function(func){
    this.addEventListener("S_toCommonJS", function(e){
      func(e, this.Storage, this.getAttribute("LighterData"));
    });
  }
});

Object.defineProperty(HTMLElement.prototype, 'onEnter', {
  set: function(func){
    this.addEventListener("keyup", function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.click();
        func(event);
      }
    }.bind(this));
  }
});

// Object.defineProperty(HTMLElement.prototype, 'SPLINT', {
//   get: function(){
//     return new S_DOMEvents(this);
//   }
// });

class S_Events {
    static #onLoadingComplete   = this.#new("S_onLoadingComplete");
    static #onInitComplete      = this.#new("S_onInitComplete");
    static {
        this.eventTarget = new EventTarget();
        this.#applyEvent(this.#onInitComplete, {once : true});
        this.#applyEvent(this.#onLoadingComplete, {once : true});
    }
    static set onInitComplete(func){
        this.#onInitComplete.STACK.push(func);
    }
    static get onInitComplete(){
        return this.#onInitComplete;
    }
    static set onLoadingComplete(func){
        this.#onLoadingComplete.STACK.push(func);
    }
    static get onLoadingComplete(){
        return this.#onLoadingComplete;
    }
    static #applyEvent(event, options = {}){
        this.eventTarget.addEventListener(event.type, function f(e){
            for(const ev of e.STACK){
                ev(e);
            }
        }.bind(this), options);
    }
    static #new(name){
        let a = new CustomEvent(name);
            a.STACK = [];
            a.dispatched = false;
            a.dispatch = function(){
                this.eventTarget.dispatchEvent(a);
                a.dispatched = true;
            }.bind(this);
        return a;
    }
    static listAllEventListeners() {
        const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
        allElements.push(document);
        allElements.push(window);
      
        const types = [];
      
        for (let ev in window) {
          if (/^on/.test(ev)) types[types.length] = ev;
        }
      
        let elements = [];
        for (let i = 0; i < allElements.length; i++) {
          const currentElement = allElements[i];
          for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === 'function') {
              elements.push({
                "node": currentElement,
                "type": types[j],
                "func": currentElement[types[j]].toString(),
              });
            }
          }
        }
      
        return elements.sort(function(a,b) {
          return a.type.localeCompare(b.type);
        });
      }
    static get KeyEvent(){
        SPLINT.getClass("S_KeyEvent", "KeyEvents");
        return S_KeyEvent;
    }
}
