
class component_Template {
    constructor(id, parent = document.body) {
        this.id     = id + "_";
        this.parent = parent;
        this.mainElement = new SPLINT.DOMElement(id + "main", 'div', parent);
    }
}