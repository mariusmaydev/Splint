
class Spinner1 {
    constructor(parent, name = "/UID()/"){
        this.parent = parent;
        this.name = name;
        this.id = "Spinner1_" + name + "_";
        this.mainElement = new DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("Spinner1");
        this.mainElement.state().setActive();
        this.draw();
    }
    draw(){
        new DOMElement(null, "div", this.mainElement);
        new DOMElement(null, "div", this.mainElement);
        new DOMElement(null, "div", this.mainElement);
        new DOMElement(null, "div", this.mainElement);
    }
    show(){
        this.mainElement.state().setActive();
    }
    hide(){
        this.mainElement.state().unsetActive();
    }
}