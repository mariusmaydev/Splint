
class S_DOMElement_TEMPLATE {
    constructor(elementName, parent, name){
        this.id = "S_" + elementName + "__" + name + "__";
        this.parent = parent;
        this.name = name;
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
    }
    Class(className){
        this.mainElement.Class(className);
    }
    remove(){
        this.mainElement.remove();
    }
}