
class S_exButton extends S_DOMElement {
    static { 
        this.TAG_NAME = "s-button";
    }
    // static get observedAttributes() { return ['name', 'value', 'type', 'step', 'min', 'max', 'pattern']; }
    constructor(parent, name, value = ""){
        super();
        this.parent     = parent;
        this.id         = "S_exButton_" + parent.id + "__" + name + "__";
        this.button = new SPLINT.DOMElement(this.id + "main", "button", this);
            this.span = new SPLINT.DOMElement(this.id + "span", "span", this.button);
            this.span.innerHTML = "value";
        // this.initEvents();
    }
    // onEnter           = function(e){};
    // set step(v){ this.setAttribute("step", v) }
    // get step(){ return this.getAttribute("step") }
    // set type(v){ this.setAttribute("type", v) }
    // get type(){ return this.getAttribute("type") }
    // set value(v){ this.setAttribute("value", v) }
    // get value(){ return this.getAttribute("value") }
    // set name(v){ this.setAttribute("name", v) }
    // get name(){ return this.getAttribute("name") }
    // set min(v){ this.setAttribute("min", v) }
    // get min(){ return this.getAttribute("min") }
    // set max(v){ this.setAttribute("max", v) }
    // get max(){ return this.getAttribute("max") }
    // set pattern(v){ this.setAttribute("pattern", v) }
    // get pattern(){ return this.getAttribute("pattern") }
    // draw(){
    //     for(const index in this.name){
    //         let val = this.name[index];
    //         let labelPart = new SPLINT.DOMElement(this.id + "labelPart_" + index, "span", this.label);
    //             labelPart.innerHTML = val;
    //             labelPart.setAttribute("index", index);
    //             if(this.transitionMultiplyer != 0){
    //                 labelPart.style.transitionDelay = index * this.transitionMultiplyer + "ms";
    //             }
    //         this.labelParts.push(labelPart);
    //     };
    // }
    // valid(value = ""){
    //     this.responseDiv.value = value;
    //     this.input.state().setActive();
    // }
    // invalid(value = ""){
    //     this.responseDiv.value = value;
    //     this.input.state().unsetActive();
    // }
    // initEvents(){ 
    //     this.input.addEventListener("keyup", function(event){
    //         if(event.key === "Enter"){
    //             event.preventDefault();
    //             this.onEnter();
    //         }
    //     }.bind(this));
    //     this.input.oninput = function(e){
    //         this.value = this.input.value;
    //         this.oninput(e);
    //         this.valid();
    //         if(this.input.value == ""){
    //         this.input.Class("filled").remove();
    //         } else {
    //         this.input.Class("filled");
    //         }
    //     }.bind(this);
    //     this.input.S_onStateChange = function(e, state){
    //     }.bind(this);
    // }
    // drawToggleButton(value){
    //     this.button = new S_switchButton(this.inputBody, "button", value);
    //     return this.button;
    // }
    // disableAnimation(){
    //     this.input.oninput = function(){};
    // }
    attributeChangedCallback(name, oldValue, newValue) {
        this.onAttributeChanged(name, oldValue, newValue);
        // if(name == "value"){
        //     this.input.value = newValue;
        // }
        // if(name == "type"){
        //     this.input.type = newValue;
        // }
        // if(name == "name"){
        //     this.draw();
        // }
        // if(name == "step"){
        //     this.input.setAttribute("step", newValue);
        // }
        // if(name == "min"){
        //     this.input.setAttribute("min", newValue);
        // }
        // if(name == "max"){
        //     this.input.setAttribute("max", newValue);
        // }
        // if(name == "pattern"){
        //     this.input.setAttribute("pattern", newValue);
        // }
    }
}
