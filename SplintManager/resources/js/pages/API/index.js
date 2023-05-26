
class P_IndexAPI extends templateMenuPage {
    constructor(){
        super("IndexAPI");
        this.addData("unsplash", "/API/types/unsplash.html");
        // this.selectHash();
        // window.addEventListener("hashchange", this.selectHash.bind(this));
        super.draw();
    }
}