
class P_Header {
    constructor(parent = document.body){
        this.parent = parent;
        this.id = "SP_Header__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("P_HeaderContainer");
        this.contentElement = new SPLINT.DOMElement(this.id + "contentElement", "div", this.mainElement);
        this.contentElement.Class("content");
        this.draw();
    }
    draw(){
        this.logo = new SPLINT.DOMElement(this.id + "Logo_Container", "div", this.contentElement);
        this.logo.Class("logo");
        this.logo.onclick = function(){
            PageNavigation.src = "/index.html";
        }
            let logoImg = new SPLINT.DOMElement(this.id + "Logo_img", "img", this.logo);
                logoImg.alt = "LOGO";

    }
}