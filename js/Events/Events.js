
var SPLINT_EVENTS = new Object();

SPLINT_EVENTS.onStateChange       = new CustomEvent("S_onStateChange");
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
            a.dispatch = function(){
                this.eventTarget.dispatchEvent(a);
            }.bind(this);
        return a;
    }

}