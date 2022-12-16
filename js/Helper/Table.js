
class Table {
    constructor(parent, name, data) {
        this.data = data;
        this.parent = parent;
        this.name = name;
        this.id = "Table_" + name + "_";
        this.mainElement = new DOMElement(this.id + "main", "div", this.parent)
        this.mainElement.Class("TableMain");
        this.func_drawListElement = function(){};
        this.func_drawHoverDiv;
        this.func_drawFirstListElement;
    }
    draw(){
        let listElementMain = new DOMElement(this.id + "listMain", "div", this.mainElement);
            listElementMain.Class("ListMain");

        if(typeof this.func_drawFirstListElement == "function"){
            let listElement = new DOMElement(this.id + "listElement_first", "div", listElementMain);
                listElement.Class("ListElement");
                listElement.Class("First");
            this.func_drawFirstListElement(listElement)
        }
        for(const index in this.data){
            let data = this.data[index];
            let listElement = new DOMElement(this.id + "listElement_" + index, "div", listElementMain);
                listElement.Class("ListElement");
                listElement.setAttribute("index", index);
                this.func_drawListElement(data, index, listElement);
            
            if(typeof this.func_drawHoverDiv == "function"){
                let hoverElement = new DOMElement(this.id + "listElement_hover_" + index, "div", listElement);
                    hoverElement.Class("ListElementHover");
                    this.func_drawHoverDiv(data, index, hoverElement);
            }
        }
    }
}