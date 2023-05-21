
class S_DOMElement extends HTMLElement {
    static set TAG_NAME(tagName){
        customElements.define(tagName, this);
    }
    constructor(){
        super();
    }
    set parent(parent){
        parent.appendChild(this);
    }
    onCreated           = function(){};
    onRemove            = function(){};
    onAttributeChanged  = function(){};
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.onAttributeChanged(name, oldValue, newValue);
    }
    connectedCallback() {
        this.onCreated(this);
    }
    disconnectedCallback() {
        this.onRemove(this);
    }
    adoptedCallback() {}

    static get Input(){
        return S_Input;
    }
    static get Chart(){
        return S_Chart;
    }
}
