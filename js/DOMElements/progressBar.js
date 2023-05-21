
class progressBar {
    constructor(parent, name, value = 50){
        this.parent     = parent;
        this.name       = name;
        this.id         = "progressBar_" + parent.id + "_" + name + "_"; 
        this._value     = value;
        this.mainElement    = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("progressBar_Splint");
        this.draw();
    }
    set value(v){
        this._value = v;
        this.draw();
    }
    draw(){
        this.BodyElement   = new SPLINT.DOMElement(this.id + "_body", "div", this.mainElement);
        this.BodyElement.Class("S_progressBar_Body");
        this.BodyElement.setAttribute("value", this._value);

        this.InnerElement   = new SPLINT.DOMElement(this.id + "_inner", "div", this.BodyElement);
        this.InnerElement.Class("S_progressBar_Inner");
        this.InnerElement.setAttribute("value", this._value);
        this.InnerElement.style.width = this._value + "%";
    }
    /**
    * false = disable
    */
    set label(value){
        if(value == false && this._label != undefined){
            this._label.element.remove();
            this._label = undefined;
            return;
        }
        this._label = new Label(this.mainElement, this.BodyElement, value, false);
        return this._label;
    }
    get label() { return this._label; }
}