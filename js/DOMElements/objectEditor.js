
class S_ObjectEditor {
    constructor(parent, name, obj, drawDirect = true){
        this.parent = parent;
        this.name = name;
        if(obj instanceof Array){
            this.obj = obj[1];
            this.obj_name = obj[0];

        } else {
            this.obj = obj;
            this.obj_name = null;
        }
        this.drawDirect = drawDirect;
        this.id = "s_ObjectEditor_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("s-ObjectEditor");
        this.Table = new SPLINT.DOMElement.Table.Grid(this.mainElement, name, Object.entries(this.obj).length, 3);
        this.onedit = function(obj, newValue){};
        this.onPattern = function(e){};
        this.patterns = [];
        if(drawDirect){
            this.draw();
        }
    }
    getPart(i_name){
        return document.querySelector("[i_name=" + i_name + "]");
    }
    draw(){
        let index = 0;
        for(const e of Object.entries(this.obj)){
            let gen = SPLINT.DOMElement.SpanDiv.get;
            if(typeof e[1] == 'object'){
                if(this.patterns.includes(e[0])){
                    this.onPattern(e, this.obj, this.obj_name);
                    continue;
                }
                let sp = gen(this.Table.getData(index, 0), "", e[0]);
                    sp.span.setAttribute("i_name", e[0]);
                let ele = this.Table.getData(index, 1);
                ele.parentElement.setAttribute("container", "true");
                let objEditor = new SPLINT.DOMElement.ObjectEditor(ele, ele.id + "_branch_" + Math.random(), e, this.drawDirect);
                    objEditor.onPattern = this.onPattern;
                    objEditor.patterns = this.patterns;
                    objEditor.onedit = function(obj, val){
                        this.obj[e[0]] = obj;
                        this.onedit(this.obj, obj);
                    }.bind(this);
                    if(!this.drawDirect){
                        objEditor.draw();
                    }
                index = index+ 1;
                continue;
            }
            // continue;
            
            gen(this.Table.getData(index, 0), "", e[0]);
            if(typeof e[1] == 'boolean' || e[1] == "true" || e[1] == "false"){
                let bt = new SPLINT.DOMElement.Button.Toggle2(this.Table.getData(index, 1), e[0]);
                    bt.state = e[1]
                    bt.onToggle = function(flag){
                        e[1] = flag;
                        this.obj[e[0]] = e[1];
                        this.onedit(this.obj, flag);
                    }.bind(this);
                index = index + 1;
                continue;
            }

            gen(this.Table.getData(index, 1), "", e[1]);
            let input = new SPLINT.DOMElement.InputDiv(this.Table.getData(index, 1), e[0], e[1]);
                input.mainElement.style.display = "none";
            let bt_edit = new SPLINT.DOMElement.Button.Switch(this.Table.getData(index, 2), "edit");
                bt_edit.bindIcon("edit");
                bt_edit.unsetActive();
                bt_edit.onactive = function(){
                    bt_edit.bindIcon("done");
                    this.Table.getData(bt_edit.button.parentElement.getAttribute("row"), 1).firstChild.style.display = "none";
                    input.mainElement.style.display = "flex";
                }.bind(this);
                bt_edit.onpassive = function(){
                    bt_edit.bindIcon("edit");
                    this.Table.getData(bt_edit.button.parentElement.getAttribute("row"), 1).firstChild.style.display = "block";
                    e[1] = input.value;
                    this.obj[e[0]] = e[1];
                    this.onedit(this.obj, e);
                    // SP_inspectProjects.saveConfig(this.data.config, this.data.uri);
                    input.mainElement.style.display = "none";
                }.bind(this)
                index = index + 1;
        }
                
        // gen(c_serverTable.getData(1, 0), "", "host", config.host);
        // gen(c_serverTable.getData(2, 0), "", "port", config.port);

    }
}