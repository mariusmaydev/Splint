
class nS_ToggleButton {
    constructor(parent, name, valueTRUE = "ON", valueFALSE = "OFF"){
        this.parent = parent;
        this.name = name;
        this.valueFALSE = valueFALSE;
        this.valueTRUE  = valueTRUE;
        this.id = "S_ToggleButton_" + name + "_" + parent.id + "__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("s-ToggleButton_2");
        this.onToggle = function(flag){};
        this.draw();
    }
    #state = false;
    set state(v){
        this.#state = SPLINT.Tools.parse.stringToBool(v);
        if(this.#state == true){
            this.button1.button.state().setActive();
            this.button2.button.state().unsetActive();
        } else {
            this.button2.button.state().setActive();
            this.button1.button.state().unsetActive();
        }
    }
    get state(){
        return this.#state;
    }
    draw(){
        this.button1 = new SPLINT.DOMElement.Button(this.mainElement, this.name + "_1", this.valueTRUE);
        this.button1.Class("btTRUE");
        this.button1.setStyleTemplate(S_Button.STYLE_DEFAULT)
        this.button1.onclick = function(){
            this.#state = true;
            this.button1.button.state().setActive();
            this.button2.button.state().unsetActive();
            this.onToggle(true);

        }.bind(this);
        this.button2 = new SPLINT.DOMElement.Button(this.mainElement, this.name + "_2", this.valueFALSE);
        this.button2.Class("btFALSE");
        this.button2.setStyleTemplate(S_Button.STYLE_DEFAULT)
        this.button2.onclick = function(){
            this.#state = false;
            this.button2.button.state().setActive();
            this.button1.button.state().unsetActive();
            this.onToggle(false);
        }.bind(this);

    }
}