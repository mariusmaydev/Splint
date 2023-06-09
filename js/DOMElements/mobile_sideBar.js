
class S_SideBarMobile extends S_DOMElement_TEMPLATE {
    constructor(parent, name,){
        super("S-SideBarMobile", parent, name);
        this.mainElement.Class("s-sideBarMobile");
        this.open();
        this.head = new SPLINT.DOMElement(this.id + "headContainer", "div", this.mainElement);
        this.head.Class("headContainer");
        this.contentElement = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.draw();
    }
    #value = "head";
    set buttonClose(v){
        if(v){
            this.bt_close = new SPLINT.DOMElement.Button(this.head, "close");
            this.bt_close.bindIcon("close");
            this.bt_close.Class("buttonClose");
            this.bt_close.onclick = this.close.bind(this);
        }
    }
    set value(v){
        this.#value = v;
        this.headline.value = v;
    }
    get value(){
        return this.#value;
    }
    close(){
        this.mainElement.SPLINT.state.setPassive();
    }
    open(){
        this.mainElement.SPLINT.state.setActive();

    }
    draw(){
        this.headline = new SPLINT.DOMElement.SpanDiv(this.head, "headline", this.#value);
        this.headline.Class("headline");

        this.buttonClose = true;
    }
}