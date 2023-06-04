
class P_Index extends templateMenuPage {
    constructor(){
        super("Index");
        this.addData("project manager", "/Projects/index.html");
        this.addData("documentation", "/documentation/index.html");
        this.draw();
    }
    async draw(){
        super.draw();
    }
}