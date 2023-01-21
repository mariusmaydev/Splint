

//CustomEvents

const SPLINT_EVENTS = new Object();

SPLINT_EVENTS.onStateChange = new CustomEvent("S_onStateChange");
SPLINT_EVENTS.toRenderer    = new CustomEvent("S_toRenderer");
SPLINT_EVENTS.toJS          = new CustomEvent("S_toJS");

//Neuer prototype für DOM

Object.defineProperty(HTMLElement.prototype, 'S_onStateChange', {
  set: function(func){
    this.addEventListener("S_onStateChange", function(e){
      func(e, this.state().get());
    });
  }
});

Object.defineProperty(HTMLElement.prototype, 'S_toRenderer', {
  set: function(func){
    this.addEventListener("S_toRenderer", function(e){
      func(e, this, this.getAttribute("LighterData"));
    });
  }
});

Object.defineProperty(HTMLElement.prototype, 'S_toJS', {
  set: function(func){
    this.addEventListener("S_toJS", function(e){
      func(e, this, this.getAttribute("LighterData"));
    });
  }
});




