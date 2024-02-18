
class Label {
    constructor(parent, elementFor, value, uniqueID = true){
        this.parent     = parent;
        this.elementFor = elementFor;
        this._value     = value;
        if(uniqueID){
            this.id = parent.id + "_label_/UID()/_";
        } else {
            this.id = parent.id + "_label_";
        }
        this.element = new SPLINT.DOMElement(this.id + "main", "label", elementFor);
        this.element.innerHTML = this._value;
    }
    set value(v){
        this._value = v;
    }
    get value() { return this._value; }
    before() {
      this.elementFor.parentNode.insertBefore(this.element, this.elementFor);
    }
    after() {
        this.elementFor.parentNode.insertBefore(this.element, this.elementFor.nextSibling);
    }
}