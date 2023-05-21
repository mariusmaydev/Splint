
class P_Index extends templateMenuPage {
    constructor(){
        super("Index");
        this.addData("DOMElements", "/DOMElements/DOMElements.html");
        this.addData("Utils", "/DOMElements/DOMElements.html");
        this.addData("Tools", "/DOMElements/DOMElements.html");
        this.addData("API", "/DOMElements/DOMElements.html");
        this.addData("DataManagement", "/DOMElements/DOMElements.html");
        this.addData("DataTypes", "/DOMElements/DOMElements.html");
        this.addData("Helper", "/DOMElements/DOMElements.html");
        this.addData("Experimental", "/DOMElements/DOMElements.html");
        this.addData("Events", "/DOMElements/DOMElements.html");
        this.addData("prototypes", "/DOMElements/DOMElements.html");
        this.addData("SplintLoader", "/DOMElements/DOMElements.html");
        this.draw();
    }
    draw(){
        super.draw();
        console.log(CallPHP_log.read_error_log());
    }
}