
class n_SelectInput {
    constructor(parent, name = "", labelName = ""){
        this.parent = parent;
        this.name = name;
        this.labelName = labelName;
        this.id = "n_SelectInput_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("n_SelectInputMain");
        this.draw();
        this.initEvents();
        this.onValueChange = function(){};
    }
    Class(className){
        this.mainElement.Class(className);
    }
    initEvents(){
        window.addEventListener("mousedown", function(e){
            e.stopPropagation();
            if(!e.target.hasParentWithID(this.mainElement.id)){
                this.closeSelect();
            }
        }.bind(this));
    }
    draw(){
        this.input = new n_InputDiv(this.mainElement, "input", this.labelName);
        this.input.input.onclick = function(e){
            if(!e.target.hasParentWithClass("switchButton")){
                this.openSelect();
            }
        }.bind(this);
        this.button = this.input.drawToggleButton();
        this.button.bindIcon("expand_more");

        this.button.onactive = function(){
            this.openSelect();
            this.button.bindIcon("chevron_left");
        }.bind(this); 

        this.button.onpassive = function(){
            this.closeSelect();
            this.button.bindIcon("expand_more");
        }.bind(this); 
        this.Select = new SPLINT.DOMElement(this.id + "select", "div", this.mainElement);
        this.Select.Class("Select_expander");
        this.closeSelect();
    }
    openSelect(){
        this.Select.state().setActive();
        if(!this.button.button.state().isActive()){
            this.button.setActive();
        }
    }
    closeSelect(){
        this.Select.state().unsetActive();
        if(this.button.button.state().isActive()){
            this.button.unsetActive();
        }
    }
    addEntry(name, value){
        let entry = new SpanDiv(this.Select, name, value);
            entry.div.setAttribute("value", value);
            entry.div.onclick = function(){
                this.value = entry.value;              
                    for(let i = 0; i < this.Select.children.length; i++){
                        let ele = document.getElementById(this.Select.children[i].id);
                            ele.setAttribute("state", "passive");
                    }
                    entry.div.setAttribute("state", "active");
            }.bind(this);
            entry.div.click();
    }
    set value(v){
        this.onValueChange(v);
        this.input.value = v;  
        this.input.input.dispatchEvent(new Event('input', {bubbles:true}));
        for(let i = 0; i < this.Select.children.length; i++){
            let ele = document.getElementById(this.Select.children[i].id);
            if(ele.getAttribute("value") == v){
                ele.setAttribute("state", "active");
            } else {
                ele.setAttribute("state", "passive");
            }
        }
    }
    get value(){
        return this.input.value;
    }
}