
class Table {
    constructor(parent, name, data) {
        this.data = data;
        this.parent = parent;
        this.name = name;
        this.id = "Table_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent)
        this.mainElement.Class("TableMain");
        this.func_drawListElement = function(data, index, listElement){};
        this.func_drawHoverDiv;
        this.func_drawFirstListElement;
    }
    Class(className){
        this.mainElement.Class(className);
    }
    draw(){
        this.listElementMain = new SPLINT.DOMElement(this.id + "listMain", "div", this.mainElement);
        this.listElementMain.Class("ListMain");

        if(typeof this.func_drawFirstListElement == "function"){
            let listElement = new SPLINT.DOMElement(this.id + "listElement_first", "div", this.listElementMain);
                listElement.Class("ListElement");
                listElement.Class("First");
            this.func_drawFirstListElement(listElement)
        }
        for(const index in this.data){
            let data = this.data[index];
            let listElement = new SPLINT.DOMElement(this.id + "listElement_" + index, "div", this.listElementMain);
                listElement.Class("ListElement");
                listElement.setAttribute("index", index);
                this.func_drawListElement(data, index, listElement);
            
            if(typeof this.func_drawHoverDiv == "function"){
                let hoverElement = new SPLINT.DOMElement(this.id + "listElement_hover_" + index, "div", listElement);
                    hoverElement.Class("ListElementHover");
                    this.func_drawHoverDiv(data, index, hoverElement);
            }
        }
    }
    static get List(){
        return Table;
    }
    static get TextTable(){
        SPLINT.getClass("textTable", "TableText")
        return textTable;
    }
    static get Grid(){
        SPLINT.getClass("Table2D", "Table2D")
        return Table2D;
    }
    static get Masonry(){
        SPLINT.getClass("Table_Masonry", "TableAdaptive")
        return Table_Masonry;
    }
}