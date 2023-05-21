
class ImgElement {
    constructor(parent, name = "") {
        this.id = "ImageElement_" + name + "_";
        this.name = name;
        this.parent = parent;
        this.div = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.img = new SPLINT.DOMElement(this.id + "img", "img", this.div);
    }
}