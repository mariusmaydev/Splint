

class textTable {
    constructor(parent, name, data = {head:[], body:[[]]}) {
        this.parent = parent;
        this.name = name;
        this.setData(data);
    }
    Class(cssClass){
        this.draw();
        this.table2D.mainElement.Class(cssClass);
    }
    setData(obj){
        this.data = obj;
        if(this.data.head.length < 1){
            this.cols = this.data.body
            .map(a=>a.length)
            .indexOf(Math.max(...this.data.body.map(a=>a.length)));
        } else {
            this.cols = this.data.head.length;

        }
        this.rows = this.data.body.length;
        this.draw();
    }
    draw(){
        this.table2D = new Table2D(this.parent, this.name, this.rows, this.cols);
        if(this.data.head.length > 0){
            this.table2D.getHead();
            for(const indexC in this.data.head){
                new SPLINT.DOMElement.SpanDiv(this.table2D.getData2Head(indexC), "", this.data.head[indexC]);
            }
        }
        for(const indexR in this.data.body){
            for(const indexC in this.data.body[indexR]){
                new SPLINT.DOMElement.SpanDiv(this.table2D.getData(indexR, indexC), "", this.data.body[indexR][indexC]);
            }
        }
    }
    setHead(...names){
        this.data.head = names;
        this.setData(this.data);
        this.draw();
    }
    setRow(index = null, ...names){
        if(index != null && this.data.body.length >= index){
            this.data.body[index] = names;
        } else {
            this.data.body.push(names);
        }
        this.setData(this.data);
        this.draw();
    }
    addRow(...names){
        this.data.body.push(names);
        this.setData(this.data);
        this.draw();
    }
}