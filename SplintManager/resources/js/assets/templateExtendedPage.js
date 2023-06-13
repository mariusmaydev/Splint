
class templateExtendedPage {
    #data = [];
    #baseHash = "";
    constructor(name, parent){
        this.parent = parent;
        this.name = name;
        this.id = "pageMenuExtended__" + name + "__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("ManagerMenuPageExtended");
        // this.draw();
    }
    set baseHash(v){
        this.#baseHash = v + "#";
    }
    get baseHash(){
        return this.#baseHash.replace("#", "");
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
                button.setAttribute("hash", this.#baseHash + data.value);
                let id = listElement.id + "_expanderDiv_";
                let div = new SPLINT.DOMElement(id + "main", "div", listElement);
                if(Object.entries(data.obj).length > 0){
                    for(const e of Object.entries(data.obj)){
                        let bt = new SPLINT.DOMElement.Button(div, id + "bt_" + e[0], e[0]);
                            bt.setAttribute("hash", this.#baseHash + e[1])
                            bt.onclick = function(){
                                window.location.hash = this.#baseHash + e[1];
                            }.bind(this);
                    }
                }
                button.onclick = function(){
                    window.location.hash = this.#baseHash + data.value;
                    if(Object.entries(data.obj).length > 0){
                        div.state().toggle();
                    }
                    // SPLINT.Tools.Location.addHash(data.value).call(false);
                }.bind(this);
        }.bind(this);
        list.draw();
        console.dir(this.#data)
    }
    addData(name, value, obj = {}){
        for(const e of Object.entries(this.#data)){
            if(e[1].name == name){
                return;
            }
        }
        this.#data.push({name: name, value: value, obj});
    }
    focusData(hash){
        let elements = this.sidebarElement.querySelectorAll("button[hash='" + this.#baseHash + hash + "']");

        for(const e of Object.values(elements)){
        // if(elements.lenght > 0){
            console.dir(e.parentElement.state().setActive);
            e.parentElement.state().setActive();
            // console.dir(elements[0].parentElement);
        }
        console.dir(elements.lenght);
    }
}