
class S_SVGParts {
    // static
}

class S_SVG_path {
    constructor(name) {
        this._name = name;
        this.id = "PART_path_" + name;
        this._path = "";
        this.element = S_SVGHelper.createElement(S_SVGElement.NS, "path", this.id);
        this.element.setAttributeNS(null, "d", "");
        this.element.classList.add(name);
    }
    set name(v){
        this.element.classList.remove(this._name)
        this.element.classList.add(v);
        this._name = v;
    }
    get name() { 
        return this._name;
    }
    Class(className){
        this.element.classList.add(className);
    }
    moveTo(x, y) {
        this.path += "M " + x + "," + y + " ";
    }
    lineTo(x, y) {
        this.path += "L " + x + "," + y + " ";
    }
    close(){
        this.path += "z";
        this.calc();
    }
    calc(){
        this.element.style.strokeDasharray = this.length + ' ' + this.length;
        this.element.style.strokeDashoffset = this.length;
    }
    get length(){
        return this.element.getTotalLength();
    }
    set fill(v){
        this.element.setAttributeNS(null, "fill", v);
    }
    set stroke(v){
        this.element.setAttributeNS(null, "stroke", v);
    }
    set strokeWidth(v){
        this.element.setAttributeNS(null, "stroke-width", v);
    }
    set path(v){
        this._path = v;
        this.element.setAttributeNS(null, "d", v);
    }
    get path(){
        return this.element.getAttributeNS(null, "d");
    }
}