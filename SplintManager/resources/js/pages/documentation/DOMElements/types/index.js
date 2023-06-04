
class P_Button extends templateMenuPage {
    constructor(){
        super("Button");
        this.draw();
        new P_Button_Ext(this.mainElement);
    }
}
class P_Button_Ext extends templateExtendedPage {
    constructor(parent){
        super("Button", parent);
        this.initEvents();
        // this.events();
        this.draw();
    }
    draw(){
        this.addData("Button", "classic");
        super.draw();
    }
    initEvents(){
        window.onhashchange = function(){
            let hashes = SPLINT.Tools.Location.getHashes();
            console.dir(hashes);
            if(hashes.includes("classic")){
                console.log(hashes)
                // this.rightContent.clear();
                new P_Button_classic(this.rightContent)
            }
        }.bind(this);
    }
    // draw(){
    //     super.draw();
    //     let button = new SPLINT.EX.DOMElement.Button(this.mainElement, "test", "text");
    // }
}