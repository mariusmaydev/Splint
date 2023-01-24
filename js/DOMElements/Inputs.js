
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
    this.button = new switchButton(this.div, this.id + "button", value);
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

class TextInputDiv {
  constructor(parent, name, value, autoHeight = true){
    this.parent = parent;
    this.name   = name;
    this.value  = value; 
    this.autoHeight = autoHeight;
    this.id     = parent.id + "_" + name + "_TextInput";
    this.div = new DOMElement(this.id + "_div", "div", this.parent);
    this.div.Class("TextInputDiv");
    this.oninput = function(){};
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
    this.textarea.oninput = function(e){
      this.#SwitchPlaceholder();
      this.oninput(e);
      if(this.autoHeight){
        this.adjustHeight();
      }
    }.bind(this);
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
      this.#SwitchPlaceholder();
      if(this.autoHeight){
        this.adjustHeight();
      }
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
  adjustHeight() {
    this.textarea.style.height = 'auto';
    this.textarea.style.height = this.textarea.scrollHeight + 'px';
  }
}

class AmountInput {
  constructor(parent, name, amount = 1, arg = "test"){
    this.parent = parent;
    this.name = name;
    this.arg = arg;
    this.min = 1;
    this.amount = amount;
    this.id = "AmountInput_" + name + "_" + parent.id + "_";
    this.mainElement = new DOMElement(this.id + "main", "div", this.parent);
    this.mainElement.Class("AmountDiv");
    this.oninput = function(){};
    this.draw();
  }
  draw(){
    let button_sub = new Button(this.mainElement, "sub");
        button_sub.bindIcon("remove");
        button_sub.onclick = function(){
          if(parseInt(this.amountInput.value.replace(this.arg, "")) > this.min){
            this.amount = parseInt(this.amountInput.value.replace(this.arg, "")) - 1;
            this.amountInput.value = this.amount + this.arg;
          }
          this.oninput(this.amount);
        }.bind(this);

    this.amountDiv = new DOMElement(this.id + "inputDiv", "div", this.mainElement);
        this.amountInput = new DOMElement(this.id + "input", "input", this.amountDiv);
        this.amountInput.value = this.amount + this.arg;
        this.amountInput.oninput = function(){
          this.amount = parseInt(this.amountInput.value.replace(this.arg, ""));
          this.oninput(this.amount);
        }.bind(this);


    let button_add = new Button(this.mainElement, "add");
        button_add.bindIcon("add");
        button_add.onclick = function(){
          this.amount = parseInt(this.amountInput.value.replace(this.arg, "")) + 1;
          this.amountInput.value = this.amount + this.arg;
          this.oninput(this.amount);
        }.bind(this);
  }
}

function dropdownInput(parent, name, labelName){
  let options = [];
  this.OnInput = function(value){}

  let div = new DOMElement(parent.id + "_div_" + name, "div", parent.id);
      div.Class("DropDownInputMain");
  this.div = div;
  let select = new DOMElement(parent.id + "_select_" + name, "select", div.id);
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
        let option = new DOMElement(parent.id + "_option_" + i + "_" + name, "option", select.id);
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