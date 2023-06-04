
class P_Button_classic {
    constructor(parent){
        this.parent = parent;
        // this.initEvents();
        this.draw();
    }
    draw(){
        console.dir(SPLINT.EX.DOMElement.Button)
        let button = new SPLINT.DOMElement.Button(this.parent, "test", "test");
    }
}