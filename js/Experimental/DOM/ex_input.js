
class S_Input extends S_DOMElement {
    static { 
        this.TAG_NAME = "s-input";
    }
    static get observedAttributes() { return ['name', 'value', 'type', 'step', 'min', 'max', 'pattern']; }
    constructor(parent, name, value = "", transitionMultiplyer = 10){
        super();
        this.parent     = parent;
        this.transitionMultiplyer = transitionMultiplyer;
        this.id         = "S_Input_" + parent.id + "__" + name + "__";
        this.labelParts = [];
            this.inputBody = new SPLINT.DOMElement(this.id + "inputContainer", "div", this);
            this.inputBody.Class("inputBody");
                this.input = new SPLINT.DOMElement(this.id + "input", "input", this.inputBody);
                this.value      = value;
                this.name       = name;
                this.type       = "value";
                // this.input.setAttribute("required", "");

                this.label = new SPLINT.DOMElement(this.id + "label", "label", this.inputBody);

            this.responseDiv = new SPLINT.DOMElement.SpanDiv(this, "response", "");
            this.responseDiv.div.Class("response");
        this.draw();
        this.oninput            = function(e){};
        this.initEvents();
    }
    onEnter           = function(e){};
    set step(v){ this.setAttribute("step", v) }
    get step(){ return this.getAttribute("step") }
    set type(v){ this.setAttribute("type", v) }
    get type(){ return this.getAttribute("type") }
    set value(v){ this.setAttribute("value", v) }
    get value(){ return this.getAttribute("value") }
    set name(v){ this.setAttribute("name", v) }
    get name(){ return this.getAttribute("name") }
    set min(v){ this.setAttribute("min", v) }
    get min(){ return this.getAttribute("min") }
    set max(v){ this.setAttribute("max", v) }
    get max(){ return this.getAttribute("max") }
    set pattern(v){ this.setAttribute("pattern", v) }
    get pattern(){ return this.getAttribute("pattern") }
    draw(){
        for(const index in this.name){
            let val = this.name[index];
            let labelPart = new SPLINT.DOMElement(this.id + "labelPart_" + index, "span", this.label);
                labelPart.innerHTML = val;
                labelPart.setAttribute("index", index);
                if(this.transitionMultiplyer != 0){
                    labelPart.style.transitionDelay = index * this.transitionMultiplyer + "ms";
                }
            this.labelParts.push(labelPart);
        };
    }
    valid(value = ""){
        this.responseDiv.value = value;
        this.input.state().setActive();
    }
    invalid(value = ""){
        this.responseDiv.value = value;
        this.input.state().unsetActive();
    }
    initEvents(){ 
        this.input.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                event.preventDefault();
                this.onEnter();
            }
        }.bind(this));
        this.input.oninput = function(e){
            this.value = this.input.value;
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
    }
    drawToggleButton(value){
        this.button = new S_switchButton(this.inputBody, "button", value);
        return this.button;
    }
    disableAnimation(){
        this.input.oninput = function(){};
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.onAttributeChanged(name, oldValue, newValue);
        if(name == "value"){
            this.input.value = newValue;
        }
        if(name == "type"){
            this.input.type = newValue;
        }
        if(name == "name"){
            this.draw();
        }
        if(name == "step"){
            this.input.setAttribute("step", newValue);
        }
        if(name == "min"){
            this.input.setAttribute("min", newValue);
        }
        if(name == "max"){
            this.input.setAttribute("max", newValue);
        }
        if(name == "pattern"){
            this.input.setAttribute("pattern", newValue);
        }
    }
}

// class n_ex_input  extends HTMLElement {
//     static HTML_template;
//     static {
//         let xhr = new XMLHttpRequest(); 
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {    
//                     ex_input.HTML_template = xhr.responseText;
//                     document.head.append(new DOMParser().parseFromString(xhr.responseText, 'text/html').querySelector('template'))
                      
//                     //do something with xhr.responseText
//                 }   
//             };      
//             xhr.open('GET', '/Splint/html/ex_inputTemplate.html');
//             xhr.send();  
//     }
//     static get observedAttributes() { return ['c', 'l']; }
//     constructor(parent, name, value = 10/*, transitionMultiplyer = 10*/){
//         super();

//         let s = new CSSStyleSheet();
//         s.replaceSync("a { color: red; }");
//         this.SHADOW = this.attachShadow({mode: 'open'});
//         let style = document.createElement("link");
//         style.setAttribute("rel", "styleshfdreet");
//         let b = document.querySelectorAll("link[rel='stylesheet']");
//         for(const style of b) {
//             console.log(style);
//             // this.SHADOW.appendChild(style.cloneNode(true));
//         }
//         // this.SHADOW.styleSheets = [s];
//         console.dir(this)
//         this.parent = parent;
//         this.value  = value;
//         this.name   = name;
//         this.setAttribute("ok", "ok")
//         // this.id = parent.id + "_n_InputDiv_" + name + "_";
//         // this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
//         // this.mainElement.Class("n_inputDiv");
//             this.SHADOW.appendChild(document.getElementById("SPLINT_template__exinput").content)
//             this.inputBody = new SPLINT.DOMElement(this.id + "input_Body", "div", this.SHADOW);
//             // this.inputBody.Class("inputBody");
//             // this.inputBody.setAttribute("part", "inputBody");

//             //     this.input = new SPLINT.DOMElement(this.id + "input", "input", this.inputBody);
//             //     this.input.setAttribute("type", "value");
//             //     this.input.setAttribute("required", "");
//             //     this.input.setAttribute("part", "input");

//             //     this.label = new SPLINT.DOMElement(this.id + "label", "label", this.inputBody);
//             //     this.transitionMultiplyer = 10;

//             // this.responseDiv = new spanDiv(this.SHADOW, "response", "");
//             // this.responseDiv.div.Class("response");
//         this.draw();
//         // this.oninput = function(e){};
//         // this._onEnter = function(e){};
//         // this.initEvents();
//         parent.appendChild(this);
//     }
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log('Custom square element attributes changed.');
//         // updateStyle(this);
//     }
//     connectedCallback() {
//         console.log('Custom square element added to page.');
//         // updateStyle(this);
//     }
//     disconnectedCallback() {
//         console.log('Custom square element removed from page.');
//     }
//     adoptedCallback() {
//         console.log('Custom square element moved to new page.');
//     }
//     // set onEnter(func){
//     //     this._onEnter = func;
//     //     this.initEvents();
//     // }
//     // get onEnter(){
//     //     return this._onEnter;
//     // }
//     draw(){
//         for(const index in this.value){
//             let val = this.value[index];
//             let valuePart = new SPLINT.DOMElement(this.id + "valuePart_" + index, "span", this.label);
//                 valuePart.innerHTML = val;
//                 valuePart.setAttribute("index", index);
//                 if(this.transitionMultiplyer != 0){
//                     valuePart.style.transitionDelay = index * this.transitionMultiplyer + "ms";
//                 }
//         };
//     }
//     valid(value = ""){
//         this.responseDiv.setValue(value);
//         this.input.state().setActive();
//     }
//     invalid(value = ""){
//       this.responseDiv.setValue(value);
//       this.input.state().unsetActive();
//     }
//     initEvents(){ 
//         this.input.oninput = function(e){
//             this.oninput(e);
//             this.valid();
//             if(this.input.value == ""){
//             this.input.Class("filled").remove();
//             } else {
//             this.input.Class("filled");
//             }
//         }.bind(this);
//         this.input.S_onStateChange = function(e, state){
//         }.bind(this);
//         this.input.onEnter = this._onEnter;
//     }
//     // drawToggleButton(value){
//     //     this.button = new S_switchButton(this.inputBody, "button", value);
//     //     return this.button;
//     // }
//     // disableAnimation(){
//     //     this.input.oninput = function(){};
//     // }
//     // get value(){
//     //   return this.input.value;
//     // }
//     // set value(value){
//     //   this.input.value = value;
//     //   this._value = value;
//     // }
//     // set type(type){
//     //   this.input.type = type;
//     // }
//     // remove(){
//     //     this.mainElement.remove();
//     // }
// }
