

class n_InputDiv extends S_DOMElement_TEMPLATE {
    constructor(parent, name, _value, transitionMultiplyer = 10){
        super("InputDiv", parent, name + "_" + parent.id)
        this.Class("n_inputDiv");
        this._value = _value;

            this.inputBody = new SPLINT.DOMElement(this.id + "input_Body", "div", this.mainElement);
            this.inputBody.Class("inputBody");
                this.input = new SPLINT.DOMElement(this.id + "input", "input", this.inputBody);
                this.input.setAttribute("type", "value");
                this.input.setAttribute("required", "");
                this.input.setAttribute("name", name);

                this.label = new SPLINT.DOMElement(this.id + "label", "label", this.inputBody);
                this.transitionMultiplyer = transitionMultiplyer;

            this.responseDiv = new SPLINT.DOMElement.spanDiv(this.mainElement, "response", "");
            this.responseDiv.div.Class("response");
        this.draw();
        this.oninput = function(e){};
        this.onclick = function(e){};
        this._onEnter = function(e){};
        this.initEvents();
    }
    set onEnter(func){
        this._onEnter = func;
        this.initEvents();
    }
    get onEnter(){
        return this._onEnter;
    }
    draw(){
        for(const index in this._value){
            let val = this._value[index];
            let valuePart = new SPLINT.DOMElement(this.id + "valuePart_" + index, "span", this.label);
                valuePart.innerHTML = val;
                valuePart.setAttribute("index", index);
                if(this.transitionMultiplyer != 0){
                    valuePart.style.transitionDelay = index * this.transitionMultiplyer + "ms";
                }
        };
    }
    Class(className){
        this.mainElement.Class(className);
    }
    valid(value = ""){
        this.responseDiv.setValue(value);
        this.input.state().setActive();
    }
    invalid(value = ""){
      this.responseDiv.setValue(value);
      this.input.state().unsetActive();
    }
    initEvents(){ 
        this.input.oninput = function(e){
            this.oninput(e);
            this.valid();
            if(this.input.value == ""){
            this.input.Class("filled").remove();
            } else {
            this.input.Class("filled");
            }
        }.bind(this);
        this.input.S_onStateChange = function(e, state){
        }.bind(this);
        this.input.onEnter = this._onEnter;
        this.input.onclick = this.onclick;
    }
    drawToggleButton(value){
        this.button = new SPLINT.DOMElement.Button.Switch(this.inputBody, "button", value);
        return this.button;
    }
    disableAnimation(){
        this.input.oninput = function(){};
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