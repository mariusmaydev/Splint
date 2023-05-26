
class S_unsplashMenu {
    constructor(parent){
        this.parent = parent;
        this.id = "S_unsplashMenu_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("s-UnsplashMenu");
        this.contentElement = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.drawList();
    }
    async drawList(){
        let dataIn = await S_API_unsplash.test();
        console.dir(dataIn);
        let list = new SPLINT.DOMElement.Table.List(this.contentElement, "imageList", dataIn);
            list.func_drawListElement = function(data, index, listElement){
                console.dir(data);
                let img = new SPLINT.DOMElement(listElement.id + "_img", "img", listElement);
                    img.src = data.urls.thumb;
            }
            list.draw();
    }
}