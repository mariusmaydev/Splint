
class InputDiv_S {
  constructor(parent, id = "", name = "") {
    this.parent = parent;
    this.name = name;
    this.id     = "InputDiv_" + id + "_"; 
    this.draw();
    this.initEvents();
  }
  draw(){
    this.div = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
    this.div.Class("S_InputDiv");
        this.input = new SPLINT.DOMElement(this.id + "input", "input", this.div);
        this.input.placeholder = this.name;
        this.label = new Label(this.div, this.input, this.name);
        this.label.element.Class("switchLabel");
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
    this.button = new S_switchButton(this.div, this.id + "button", value);
    this.button.unsetActive();
    this.button.disableStandard();
    this.div.insertBefore(this.button.button, this.responseDiv.div);
    this.input.Class("button");

    return this.button;
  }
  get value(){
    return this.input.value;
  }
  set value(value){
    this.input.value = value;
    this._value = value;
  }
  set type(type){
    this.input.type = type;
  }
}





/**
 * @deprecated
 *
 * @param   {[type]}  parent     [parent description]
 * @param   {[type]}  name       [name description]
 * @param   {[type]}  labelName  [labelName description]
 *
 * @return  {[type]}             [return description]
 */
function dropdownInput(parent, name, labelName){
  let options = [];
  this.OnInput = function(value){}

  let div = new SPLINT.DOMElement(parent.id + "_div_" + name, "div", parent.id);
      div.Class("DropDownInputMain");
  this.div = div;
  let select = new SPLINT.DOMElement(parent.id + "_select_" + name, "select", div.id);
      select.oninput = SwitchPlaceholder.bind(this);
      let label = new Label(div, select, labelName);
          label.before();
      let responseSpanDiv = new spanDiv(div, parent.id + "_" + name + "_response", "div");
          responseSpanDiv.div.style.display = "none";    
          addOption("", labelName, true);
          select.selected = labelName;

  draw();
  function draw(){
    for(let i = 0; i < options.length; i++){
        let option = new SPLINT.DOMElement(parent.id + "_option_" + i + "_" + name, "option", select.id);
            option.value = options[i].value;
            option.innerHTML = options[i].text;
            if(options[i].hidden == true){
              option.setAttribute("hidden", "hidden");
            }
    }
    select.selected = labelName;
  }
  
  function SwitchPlaceholder() {
    select.classList.remove("invalidInput");
    responseSpanDiv.div.style.display = "none";
    if(select.value != ""){
        label.element.style.visibility = "visible";
        select.classList.add("inputFilled");
        div.classList.add("inputFilled");
        this.OnInput(select.value);
    } else {
        label.element.style.visibility = "hidden";
        select.classList.remove("inputFilled");
        div.classList.remove("inputFilled");
    }
  }
  // this.OnInput = OnInput();
  // function OnInput(func){
  //   func();
  // }
  this.addOption = addOption; 
  function addOption(value, text, hidden = false){
    let obj = new Object();
        obj.value = value;
        obj.text = text;
        obj.hidden = hidden;
    options.push(obj);
    draw();
  }
  this.setValue = function(value){
    if(value != undefined && value != ""){
      this.addOption("", value, true);
      select.selected = value;
      select.value = value;
      SwitchPlaceholder.bind(this);
    }
  }.bind(this);
  this.getValue = function(){
    return select.value;
  }
  this.invalid = function(value){
    if(!select.classList.contains("invalidInput")){
      select.classList.add("invalidInput");
      if(value != undefined){
        responseSpanDiv.value(value);
        responseSpanDiv.div.style.display = "block";
      }
    }
  }
  this.valid = function(){
    if(select.classList.contains("invalidInput")){
      select.classList.remove("invalidInput");
      if(value != undefined){
        responseSpanDiv.div.style.display = "none";
      }
    }
  }
}