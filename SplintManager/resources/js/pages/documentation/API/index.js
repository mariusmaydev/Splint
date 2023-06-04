
class P_IndexAPI extends templateMenuPage {
    constructor(){
        super("IndexAPI");
        this.addData("unsplash", "/documentation/API/types/unsplash.html");
        this.addData("klipper", "/documentation/API/types/klipper.html");
        // this.selectHash();
        // window.addEventListener("hashchange", this.selectHash.bind(this));
        super.draw();
    }
}