
class DropDownInput_S {
    constructor(parent, name = ""){
        this.parent = parent;
        this.name = name;
        this.id = "DropDownInput_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("DropDownInputMain_S");
        this.draw();
        this.initEvents();
        this.onValueChange = function(){};
    }
    Class(className){
        this.mainElement.Class(className);
    }
    initEvents(){
        window.addEventListener("click", function(e){
            if(!e.target.hasParentWithClass("DropDownInputMain_S")){
                this.closeDropDown();
            }
        }.bind(this));
    }
    draw(){
        this.input = new SPLINT.DOMElement.InputDiv(this.mainElement, this.id + "input", this.name);
        this.input.inputBody.onclick = function(e){
            if(!e.target.hasParentWithClass("switchButton")){
                this.openDropDown();
            }
        }.bind(this);
        this.button = this.input.drawToggleButton();
        this.button.bindIcon("chevron_left");

        this.button.onactive = function(){
            this.openDropDown();
            this.button.bindIcon("expand_more");
        }.bind(this); 

        this.button.onpassive = function(){
            this.closeDropDown();
            this.button.bindIcon("chevron_left");
        }.bind(this); 
        this.dropDown = new SPLINT.DOMElement(this.id + "dropdown", "div", this.mainElement);
        this.dropDown.Class("DropDown_expander");
    }
    openDropDown(){
        this.dropDown.state().setActive();
        if(!this.button.button.state().isActive()){
            this.button.setActive();
        }
    }
    closeDropDown(){
        this.dropDown.state().unsetActive();
        if(this.button.button.state().isActive()){
            this.button.unsetActive();
        }
    }
    addEntry(name, value, func = function(){}){
        let entry = new SPLINT.DOMElement.SpanDiv(this.dropDown, name, value);
            entry.div.setAttribute("value", value);
            func(entry, value);
            // entry.span.setAttribute("data-value", value);
            entry.div.onclick = function(){
                this.value = entry.value;              
                    for(let i = 0; i < this.dropDown.children.length; i++){
                        let ele = document.getElementById(this.dropDown.children[i].id);
                            ele.setAttribute("state", "passive");
                    }
                    entry.div.setAttribute("state", "active");
            }.bind(this);
    }
    set value(v){
        this.onValueChange(v);
        this.input.value = v;  
        this.input.input.dispatchEvent(new Event('input', {bubbles:true}));
        for(let i = 0; i < this.dropDown.children.length; i++){
            let ele = document.getElementById(this.dropDown.children[i].id);
            if(ele.getAttribute("value") == v){
                ele.setAttribute("state", "active");
            } else {
                ele.setAttribute("state", "passive");
            }
        }
    }
}