
class S_HorizontalLine {
    constructor(parent, Class = "horizontalLine") {
        this.parent = parent;
        this.index = 0;
        this.Class = Class;
        return this.draw();
    }
    draw(){
        while(document.getElementById(this.parent.id + "_HorizontalLine_" + this.index, "hr") != null){
          this.index++;
        }
        let element = new SPLINT.DOMElement(this.parent.id + "_HorizontalLine_" + this.index, "hr", this.parent);
            element.Class(this.Class);
        return element;
    }
}