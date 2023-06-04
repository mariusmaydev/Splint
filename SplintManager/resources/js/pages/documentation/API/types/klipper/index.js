
class P_klipperAPI extends templateMenuPage {
    constructor(){
        super("klipperAPI");
        this.draw();
        new P_klipperAPI_Ext(this.mainElement);
    }
}
class P_klipperAPI_Ext extends templateExtendedPage {
    constructor(parent){
        super("klipperAPI", parent);
        this.initEvents();
        // this.events();
        this.draw();
    }
    draw(){
        this.addData("installation", "installation");
        super.draw();
        new A_klipperAPI_installation(this.rightContent)
    }
    initEvents(){
        window.onhashchange = function(){
            let hashes = SPLINT.Tools.Location.getHashes();
            console.dir(hashes);
            if(hashes.includes("installation")){
                console.log(hashes)
                // this.rightContent.clear();
                new A_klipperAPI_installation(this.rightContent)
            } 
        }.bind(this);

    }
    // draw(){
    //     super.draw();
    //     let button = new SPLINT.EX.DOMElement.Button(this.mainElement, "test", "text");
    // }
}