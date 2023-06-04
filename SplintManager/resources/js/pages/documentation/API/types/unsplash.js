
class P_unsplashAPI extends templateMenuPage {
    constructor(){
        super("unsplashAPI");
        // this.selectHash();
        // window.addEventListener("hashchange", this.selectHash.bind(this));
        this.draw();
    }
    draw(){
        super.draw();
        let res = new S_unsplashMenu(this.mainElement);
    }
}