
class SM_PHP_debuggLog {
    constructor(parent, data){
        this.parent = parent;
        this.data = data;
        this.id = "PHPdebuggLog_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("PHP_debuggLog");
        this.contentElement = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.draw();
    }
    async getData(){
        
        let uri = location.origin + this.data.config.paths.error_log + "PHP_debugg_log.log";
        this.data = await  SPLINT.Utils.Files.read(uri);
        this.data = this.data.replaceAll("C:\\xampp\\htdocs\\", "");
        this.data = this.data.replaceAll(" at ", "<br>at ");
        this.data = this.data.replaceAll("\r\n", "<br>");
        this.data = this.data.replaceAll("\r", "<br>");
        this.data = this.data.replaceAll("\n", "<br>");
        this.data = this.data.replaceAll("DEBUG", '<span style="color: gold;">DEBUG</span>')
        this.data = SM_parseLog.parse(this.data);
                console.log(this.data);//await CallPHP_log.read_error_log());
    }
    async draw(){
        await this.getData();
        this.list = new SPLINT.DOMElement.Table.List(this.contentElement, "debuggLogPHP", this.data);
        this.list.func_drawListElement = function(data, index, listElement){
            let msgEle = new SPLINT.DOMElement.TextView(listElement, "msg" + index);
                msgEle.value = data.msg;
            let traceDiv = new SPLINT.DOMElement(listElement.id + "taceContainer", "div", listElement);
                traceDiv.Class("traceDiv");
                let head = new SPLINT.DOMElement(listElement.id + "traceHead", "div", traceDiv);
                    head.Class("traceHead");
                    head.onclick = function(){
                        traceDiv.state().toggle();
                    }
                let traceText = new SPLINT.DOMElement.TextView(traceDiv, "traceText");
                    traceText.value = data.trace;
        }
        this.list.draw();
        // this.textView = new SPLINT.DOMElement.TextView(this.mainElement);
        // this.textView.value = this.data;
        
    }
}