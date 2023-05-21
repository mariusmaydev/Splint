
class Table2D {
    constructor(parent, name, rows, cols){
        this.name = name;
        this.id = "Table2D_" + name + "_";
        this.parent = parent;
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("Table2D");
        this.tableElement = new SPLINT.DOMElement(this.id + "TableMain", "table", this.mainElement);
        this.tableElement.Class("Table2DMain");
        this.rowElements = [];
        this.colElements = [];
        this.cols = cols;
        this.rows = rows;
        this.draw();
    }
    draw(){
        for(let iR = 0; iR < this.rows; iR++){
            let row = this.getRow();
                for(let iC = 0; iC < this.cols; iC++){
                    this.getData(iR, iC);
                }
        }
    }
    getHead(){
        let row = new SPLINT.DOMElement(this.id + "TableHead", "tr", this.tableElement);
            row.Class("Table2DHead");
            this.head = row;
            for(let iC = 0; iC < this.cols; iC++){
                this.getData2Head(iC);
            }
        this.tableElement.insertBefore(row, this.rowElements[0]);
        return row;
    }
    getData2Head(column){
        let dataEle = new SPLINT.DOMElement(this.id + "TableData_Head_" + column, "th", this.head);
            dataEle.Class("Table2DData");
        return dataEle;
    }
    getRow(index = null){
        if(index != null){
            return document.getElementById(this.id + "TableRow_" + index);
        } else {
            let row = new SPLINT.DOMElement(this.id + "TableRow_" + (this.rowElements.length-1), "tr", this.tableElement);
                row.Class("Table2DRow");
                row.setAttribute("row", (this.rowElements.length-1));
            this.rowElements.push(row);
            return row;
        }
    }
    getData(row, column){
        if(document.getElementById(this.id + "TableData_" + row + "_" + column) != null){
            return document.getElementById(this.id + "TableData_" + row + "_" + column);
        }
        let dataEle = new SPLINT.DOMElement(this.id + "TableData_" + row + "_" + column, "td", this.rowElements[row]);
            dataEle.Class("Table2DData");
            dataEle.setAttribute("row", row);
            dataEle.setAttribute("col", column);
        return dataEle;
    }
}