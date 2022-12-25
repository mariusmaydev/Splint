
class InputDiv_S {
  constructor(parent, id = "", name = "") {
    this.parent = parent;
    this.name = name;
    this.id     = "InputDiv_" + id + "_"; 
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
  invalid(value = ""){
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

class TextInputDiv {
  constructor(parent, name, value){
    this.parent = parent;
    this.name   = name;
    this.value  = value; 
    this.id     = parent.id + "_" + name + "_TextInput";
    this.div = new DOMElement(this.id + "_div", "div", this.parent);
    this.div.Class("TextInputDiv");
    this.draw();
  }
  get Value(){
    return this.textarea.value;
  }
  draw(){
    this.textarea  = new DOMElement(this.id + "_textarea", "textarea", this.div);
    this.textarea.placeholder = this.value;
    this.textarea.onclick = this.OnClick;
    this.label = new Label(this.div, this.textarea, this.value);
    this.label.before();
    this.divider = new HorizontalLine(this.div);
    this.divider.style.visibility = "hidden";
    this.textarea.oninput = this.#SwitchPlaceholder.bind(this);
  }
  setLabel(text){
    this.label = new Label(this.div, this.input, text);
    this.label.before();
    return this.label;
  }
  OnClick = function(e){};
  get isChecked(){
    return this.input.checked;
  }
  setValue(value){
    if(value != undefined){
      this.textarea.value = value;
      SwitchPlaceholder();
    }
  }
  #SwitchPlaceholder() {
    if(this.textarea.value != ""){
        this.label.element.style.visibility = "visible";
        this.divider.style.visibility = "visible";
        this.textarea.classList.add("inputFilled");
        this.div.classList.add("inputFilled");
    } else {
        this.label.element.style.visibility = "hidden";
        this.divider.style.visibility = "hidden";
        this.textarea.classList.remove("inputFilled");
        this.div.classList.remove("inputFilled");
    }
  }
}