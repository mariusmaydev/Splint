
class S_Checkbox {
    constructor(parent, name, checked = false){
        this._checked = checked;
        this.parent = parent;
        this.name = name;
        this.id = "checkbox_" + name + "_" + parent.id + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("checkbox");
        this.draw();
        this.events();
    }
    set checked(v){
        this._checked = v;
        this.input.setAttribute("checked", v);;
        this.input.onclick();
    }
    set disabled(v){
        if(v){
            this.input.setAttribute("disabled", v); 
        } else {
            this.input.removeAttribute("disabled");
        }
    }
    Class(name){
        this.Class(name);
    }
    draw(){
        this.input = new SPLINT.DOMElement(this.id + "input", "input", this.mainElement);
        this.input.type = "checkbox";
    }
    set labelBefore(v){
        this.labelBeforeElement = new SPLINT.DOMElement.Label(this.mainElement, this.input, v);
        this.labelBeforeElement.before();
    }
    set labelAfter(v){
        this.labelAfterElement = new SPLINT.DOMElement.Label(this.mainElement, this.input, v);
        this.labelAfterElement.after();
    }
    get state(){
        return this.input.state().get();
    }
    events(){
        this.input.onclick = function(){
            if(this.input.checked == true){
                this.input.state().setActive();
            } else {
                this.input.state().unsetActive();
            }
        }.bind(this);
        if(this._checked){
            this.input.state().setActive();
            this.input.checked = true;
        } else {
            this.input.state().unsetActive();
        }
    }
}