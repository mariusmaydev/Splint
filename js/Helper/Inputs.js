
class InputDiv_S {
  constructor(parent, name = ""){
    this.parent = parent;
    this.name = name;
    this.id     = "InputDiv_" + name + "_"; 
    this.draw();
    this.initEvents();
  }
  draw(){
    this.div = new DOMElement(this.id + "main", "div", this.parent);
    this.div.Class("S_InputDiv");
        this.input = new DOMElement(this.id + "input", "input", this.div);
        this.input.placeholder = this.name;
        this.label = new Label(this.div, this.input, this.name);
        this.label.before();

        this.responseDiv = new spanDiv(this.div, this.id + "response", "");
        this.responseDiv.div.Class("response");
  }
  invalid(value){
    this.responseDiv.setValue(value);
    this.input.state().unsetActive();
  }
  valid(){
    this.responseDiv.setValue("");
    this.input.state().setActive();
  }
  initEvents(){
    this.input.oninput = function(){
      this.valid();
      if(this.input.value == ""){
        this.input.Class("filled").remove();
        this.label.element.style.visibility = "hidden";
      } else {
        this.label.element.style.visibility = "visible";
        this.input.Class("filled");
      }
    }.bind(this);
    this.input.S_onStateChange = function(e, state){
    }.bind(this);
  }
  drawSwitchButton(value = ""){
    this.button = new switchButton(this.div, this.id + "button", value);
    this.button.unsetActive();
    this.button.disableStandard();
    this.div.insertBefore(this.button.button, this.responseDiv.div);
    this.input.Class("button");

    return this.button;
  }
  get value(){
    return this._value;
  }
  set value(value){
    this.input.value = value;
    this._value = value;
  }
  set type(type){
    this.input.type = type;
  }
}