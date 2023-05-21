
class index {
    static data = [{name: "input"}, {name: "input"}];
    constructor(parent){
        this.parent = parent;
        this.id = "index_";
        this.mainElement = new DOMElement(this.id + "main", "div", this.parent);
        this.draw();
    }
    draw(){
        console.log(index.data);
        this.table = new Table(this.mainElement, "list", index.data);
        this.table.func_drawListElement = function(data, index, listElement){
            let button = new Button(listElement, index, data.name);
                button.onclick = function(){
                    let su = new subWindow(index, true);
                };
        }.bind(this);
        this.table.draw();
    }
}