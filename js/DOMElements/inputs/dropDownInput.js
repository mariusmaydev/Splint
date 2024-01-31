
class DropDownInput_S {
    constructor(parent, name = "", title = ""){
        this.parent = parent;
        this.name = name;
        if(title == ""){
            this.title = name;
        } else {
            this.title = title;
        }
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
        window.addEventListener("mouseup", function(e){
            if(!e.target.hasParentWithClass("DropDownInputMain_S")){
                this.closeDropDown();
            }
        }.bind(this));
        this.input.input.onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
            this.input.input.focus();
            this.openDropDown();
        }.bind(this)
        this.input.oninput = function(e){
            let childs = this.dropDown.childNodes;
            let value = e.target.value.toLowerCase();
            for(let child of childs){
                let txtValue = child.textContent || child.innerText;
                if (txtValue.toLowerCase().indexOf(value) > -1) {
                  child.style.display = "";
                  this.input.input.onkeydown = function(e){
                    if(e.keyCode == 13){
                        this.value = txtValue;  
                        this.closeDropDown();
                        this.input.input.blur();
                    }    
                  }.bind(this)
                } else {
                  child.style.display = "none";
                }
            }
        }.bind(this)
    }
    draw(){
        this.input = new SPLINT.DOMElement.InputDiv(this.mainElement, this.id + "input", this.title);
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
        for(let i = 0; i < this.dropDown.children.length; i++){
            let ele = document.getElementById(this.dropDown.children[i].id);
            console.log(ele.textContent ,this.input.value)
            if(ele.textContent ==this.input.value){
                ele.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                console.dir(ele)
            }
        }
    }
    closeDropDown(){
        this.dropDown.state().unsetActive();
        if(this.button.button.state().isActive()){
            this.button.unsetActive();
        }
        for(let i = 0; i < this.dropDown.children.length; i++){
            let ele = document.getElementById(this.dropDown.children[i].id);
                ele.style.display = "";

        }
    }
    addEntry(name, value, func = function(){}){
        let entry = new SPLINT.DOMElement.SpanDiv(this.dropDown, name, value);
            entry.div.setAttribute("name", name);

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
                    this.closeDropDown();
            }.bind(this);
    }
    removeEntry(name = null, value = null){
        for(let i = 0; i < this.dropDown.children.length; i++){
            let ele = document.getElementById(this.dropDown.children[i].id);

            if(ele.getAttribute("value") == value || ele.getAttribute("name") == name || (name == null && value == null)){
                ele.remove();
            }
        }
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