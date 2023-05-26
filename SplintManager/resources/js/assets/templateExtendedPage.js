
class templateExtendedPage {
    #data = [];
    constructor(name, parent){
        this.parent = parent;
        this.name = name;
        this.id = "pageMenuExtended__" + name + "__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("ManagerMenuPageExtended");
        // this.draw();
    }
    draw(){
        this.leftContent    = new SPLINT.DOMElement(this.id + "leftContent", "div", this.mainElement);
        this.leftContent.Class("leftContent");
        this.rightContent   = new SPLINT.DOMElement(this.id + "rightContent", "div", this.mainElement);
        this.rightContent.Class("rightContent");
        this.sidebar();
    }
    sidebar(){
        this.sidebarElement = new SPLINT.DOMElement(this.id + "leftSideBar", "div", this.leftContent);
        this.sidebarElement.Class("sidebarLeft");
        
        let list = new SPLINT.DOMElement.Table.List(this.sidebarElement, this.name, this.#data);
            list.func_drawListElement = function(data, index, listElement){
            let button = new SPLINT.DOMElement.Button(listElement, data.name, data.name);
                let id = listElement.id + "_expanderDiv_";
                let div = new SPLINT.DOMElement(id + "main", "div", listElement);
                if(Object.entries(data.obj).length > 0){
                    for(const e of Object.entries(data.obj)){
                        let bt = new SPLINT.DOMElement.Button(div, id + "bt_" + e[0], e[0]);
                            bt.onclick = function(){
                                window.location.hash = e[1];
                            }
                    }
                }
                button.onclick = function(){
                    window.location.hash = data.value;
                    if(Object.entries(data.obj).length > 0){
                        div.state().toggle();
                    }
                    // SPLINT.Tools.Location.addHash(data.value).call(false);
                }
        }.bind(this);
        list.draw();
    }
    addData(name, value, obj = {}){
        this.#data.push({name: name, value: value, obj:obj});
    }
}