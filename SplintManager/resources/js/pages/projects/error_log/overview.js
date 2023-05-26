
class SM_error_log_Overview {
    constructor(parent, data){
        this.parent = parent;
        this.data = data;
        this.id = "ErrorLog_Overview_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("errorLog_Overview");
        this.draw();
    }
    draw(){
        this.PHPdebuggLog = new SM_PHP_debuggLog(this.mainElement, this.data); 
    }
}