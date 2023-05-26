
class P_Index extends templateMenuPage {
    constructor(){
        super("Index");
        this.addData("Projects", "/Projects/index.html");
        this.addData("DOMElements", "/DOMElements/DOMElements.html");
        this.addData("Utils", "/DOMElements/DOMElements.html");
        this.addData("Tools", "/DOMElements/DOMElements.html");
        this.addData("API", "/API/index.html");
        this.addData("DataManagement", "/DOMElements/DOMElements.html");
        this.addData("DataTypes", "/DOMElements/DOMElements.html");
        this.addData("Helper", "/DOMElements/DOMElements.html");
        this.addData("Experimental", "/DOMElements/DOMElements.html");
        this.addData("Events", "/DOMElements/DOMElements.html");
        this.addData("prototypes", "/DOMElements/DOMElements.html");
        this.addData("SplintLoader", "/DOMElements/DOMElements.html");
        this.draw();
    }
    async draw(){
        super.draw();
    }
}