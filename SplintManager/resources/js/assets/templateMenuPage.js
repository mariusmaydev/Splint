
class templateMenuPage {
    #data = [];
    constructor(name){
        this.parent = document.body;
        this.name = name;
        this.id = "pageMenu__" + name + "__";
        this.header = new P_Header();
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("ManagerMenuPage");
        // this.draw();
    }
    draw(){
        this.list = new SPLINT.DOMElement.Table.List(this.mainElement, this.name, this.#data);
        this.list.func_drawListElement = function(data, index, listElement){
            let button = new SPLINT.DOMElement.Button(listElement, data.name, data.name);
                button.onclick = function(){
                    PageNavigation.src = data.value;
                }
        }.bind(this);
        this.list.draw();
    }
    addData(name, value){
        this.#data.push({name: name, value: value});
    }
}