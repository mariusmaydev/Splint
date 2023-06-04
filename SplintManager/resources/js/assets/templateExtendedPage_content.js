
class templateExtendedPage_content {
    constructor(name, parent){
        this.parent = parent;
        this.name   = name;
        this.id     = "pageMenuExtended_content__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("ManagerMenuPageExtended_content");
    }
    #headline = null;
    draw(){
        this.headlineContainer = new SPLINT.DOMElement(this.id + "headlineContainer", "div", this.mainElement);
        this.headlineContainer.Class("headlineContainer");
        this.content = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.content.Class("content");
    }
    set headline(value){
        this.#headline = value;
        this.headlineContainer.clear();
        if(value != null){
            this.headlineEle = new SPLINT.DOMElement.SpanDiv(this.headlineContainer, "headline", value);
        }
    }
    get headline(){
        return this.#headline;
    }
    drawHeadline(){
    }
}