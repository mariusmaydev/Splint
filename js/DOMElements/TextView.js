
class S_TextView {
    constructor(parent, name = ""){
        this.parent = parent;
        this.name = name;
        this.id = "S_TextView_" + parent.id + "_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("s-TextView");
        this.paragraph = new SPLINT.DOMElement(this.id + "paragrapth", "p", this.mainElement);
    }
    #value = "";
    set value(v){
        this.#value = v;
        this.paragraph.innerHTML = v;
    }
    get value(){
        return this.#value;
    }
}