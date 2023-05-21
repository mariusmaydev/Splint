
class S_SVGElement {
    static NS = "http://www.w3.org/2000/svg";
    constructor(parent, name){
        this.name = name;
        this.id = "S_SVGElement_" + name + "_";
        this.parent = parent;
        this.NS = S_SVGElement.NS;
        this.viewBox = [0, 0, 0, 0];
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("S_SVGElement_BODY");
        this.contentElement = S_SVGHelper.createElement(this.NS, "svg", this.id + "content");
        this.mainElement.appendChild(this.contentElement);
        // this.contentElement.Class("S_SVGElement_CONTENT"); 
    }
    Class(className){
        this.mainElement.Class(className);
    }
    newPATH(name){
        let path = new S_SVG_path(name);
        this.addPart(path);
        return path;
    }
    addPart(SVGPart){
        SVGPart.element.id = this.id + SVGPart.element.id;
        this.contentElement.appendChild(SVGPart.element);
    }
    #setAttr(name, value){
        this.contentElement.setAttribute(name, value);
    }
    #getAttr(name){
        return this.contentElement.getAttribute(name);
    }
    set xmlns(link){
        this.#setAttr("xmlns", link);
    }
    setViewBox(x, y, dx, dy){
        this.viewBox = [x, y, dx, dy];
        this.#setAttr("viewBox", x + " " + y + " " + dx + " " + dy)
    }
    getViewBox(){
        return this.viewBox;
    }
    set width(v){
        this.#setAttr("width", v);
    }
    get width(){
        return this.#getAttr("width");
    }
    set height(v){
        this.#setAttr("height", v);
    }
    get height(){
        return this.#getAttr("height");
    }
    static get path(){
        return S_SVG_path;
    }

}