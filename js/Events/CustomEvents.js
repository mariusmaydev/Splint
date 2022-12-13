

//CustomEvents

const SPLINT_EVENTS = new Object();

SPLINT_EVENTS.onStateChange = new CustomEvent("S_onStateChange");

//Neuer prototype für DOM

Object.defineProperty(HTMLElement.prototype, 'S_onStateChange', {
  set: function(func){
    this.addEventListener("S_onStateChange", function(e){
      func(e, this.state().get());
    });
  }
});