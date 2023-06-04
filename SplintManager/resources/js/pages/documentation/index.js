
class P_Documentation extends templateMenuPage {
    constructor(){
        super("Documentation");
        this.addData("DOMElements", "/documentation/DOMElements/index.html");
        // this.addData("Utils", "/DOMElements/DOMElements.html");
        // this.addData("Tools", "/DOMElements/DOMElements.html");
        this.addData("API", "/documentation/API/index.html");
        // this.addData("DataManagement", "/DOMElements/DOMElements.html");
        // this.addData("DataTypes", "/DOMElements/DOMElements.html");
        // this.addData("Helper", "/DOMElements/DOMElements.html");
        // this.addData("Experimental", "/DOMElements/DOMElements.html");
        // this.addData("Events", "/DOMElements/DOMElements.html");
        // this.addData("prototypes", "/DOMElements/DOMElements.html");
        // this.addData("SplintLoader", "/DOMElements/DOMElements.html");
        this.draw();
    }
    async draw(){
        super.draw();
    }
}