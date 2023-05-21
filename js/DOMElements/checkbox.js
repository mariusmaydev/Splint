
class checkbox_S {
    constructor(parent, name, checked = false){
        this.checked = checked;
        this.parent = parent;
        this.name = name;
        this.id = "checkbox_" + name + "_" + parent.id + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("checkbox");
        this.draw();
        this.events();
    }
    draw(){
        this.input = new SPLINT.DOMElement(this.id + "input", "input", this.mainElement);
        this.input.type = "checkbox";

        this.label = new Label(this.mainElement, this.input, this.name);
        this.label.before();
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
        if(this.checked){
            this.input.state().setActive();
            this.input.checked = true;
        } else {
            this.input.state().unsetActive();
        }
    }
}