
class S_ChoiceButton extends S_DOMElement_TEMPLATE {
    buttons = [];
    constructor(parent, name){
        super("S-ButtonChoice", parent, name);
    }
    add(name, value){
        let bt = new SPLINT.DOMElement.Button(this.mainElement, name, value);
            bt.button.addEventListener("click", function(){
                this.focus(bt);
            }.bind(this))
            this.buttons.push(bt);
        return bt;
    }
    focus(button){
        for(const e of this.buttons){
            e.button.state().unsetActive();
            if(e.button.id == button.button.id){
                e.button.state().setActive();
            } else {
            }
        }
    }
}