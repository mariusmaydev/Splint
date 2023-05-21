
class S_toggleButton {
    constructor(parent, name) {
        this.id = "toggleButton_" + name + "_" + parent.id + "_";
        this.name = name;
        this.parent = parent;
        this.elements = [];
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("toggleButton");
    }
    get value(){
        for(const element of this.elements){
            if(element.element.button.state().isActive()){
                return element.name;
            }
        }
    }
    addElement(value, name, onclick = function(){}){
        for(const element of this.elements){
            if(element.name == name){
                return;
            }
        }
        let ele = new S_Button(this.mainElement, name, value);
            ele.setStyleTemplate(S_Button.STYLE_NONE);
            ele.onclick = function(){
                ele.button.state().setActive();
                for(const element of this.elements){
                    if(element.name != name){
                        element.element.button.state().unsetActive();
                    }
                }
                onclick();
            }.bind(this);
        let obj = new Object();
            obj.value   = value;
            obj.name    = name;
            obj.element = ele;
        this.elements.push(obj);
    }
    setActive(name){
        for(const element of this.elements){
            if(element.name != name){
                element.element.button.state().unsetActive();
            } else {
                element.element.button.state().setActive();
            }
        }
    }
}