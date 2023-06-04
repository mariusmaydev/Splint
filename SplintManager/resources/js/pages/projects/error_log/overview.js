
class SM_error_log_Overview {
    constructor(parent, data){
        this.parent = parent;
        this.dataIn = data;
        this.data = new Object();
        this.id = "ErrorLog_Overview_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("errorLog_Overview");
        this.draw();
    }
    async getData(name){
        let uri = location.origin + this.dataIn.config.paths.error_log + name;
        let data = await  SPLINT.Utils.Files.read(uri);
        // this.data = this.data.replaceAll("C:\\xampp\\htdocs\\", "");
        // this.data = this.data.replaceAll(" at ", "");
        // this.data = this.data.replaceAll("\r\n", "<br>");
        // this.data = this.data.replaceAll("\r", "<br>");
        // this.data = this.data.replaceAll("\n", "<br>");
        // this.data = this.data.replaceAll("DEBUG", '<span style="color: orange;">DEBUG</span>')
        // this.data = this.data.replaceAll("WARN", '<span style="color: darkorange;">WARN</span>')
        // this.data = this.data.replaceAll("ERROR", '<span style="color: red;">ERROR</span>')
        // this.data = this.data.replaceAll("NOTICE", '<span style="color: blue;">NOTICE</span>')
        data = SM_parseLog.parse(data);
        this.data[name] = data;
    }
    async draw(){
        await this.getData("PHP_debugg_log.log");
        await this.getData("PHP_error_log.log");
        await this.getData("PHP_error_log_MySQL.log");

        this.table = new SPLINT.DOMElement.Table.Grid(this.mainElement, "logFiles", 4, 3);
        this.table.getHead();
        let gen = SPLINT.DOMElement.SpanDiv.get;
        gen(this.table.getData2Head(0), "", "name");
        gen(this.table.getData2Head(1), "", "entries");
        gen(this.table.getData2Head(2), "", "last time");

        gen(this.table.getData(1, 0), "", "PHP error");
        gen(this.table.getData(2, 0), "", "PHP debugg");
        gen(this.table.getData(3, 0), "", "PHP MySQL");

        gen(this.table.getData(1, 1), "", this.data["PHP_error_log.log"].len);
        gen(this.table.getData(2, 1), "", this.data["PHP_debugg_log.log"].len);
        gen(this.table.getData(3, 1), "", this.data["PHP_error_log_MySQL.log"].len);

        gen(this.table.getData(1, 2), "", this.data["PHP_error_log.log"].last);
        gen(this.table.getData(2, 2), "", this.data["PHP_debugg_log.log"].last);
        gen(this.table.getData(3, 2), "", this.data["PHP_error_log_MySQL.log"].last);
        this.table.draw();

        this.table.getRow(0).onclick = function(){
            window.location.hash = "PHP_error_log";
        }
        this.table.getRow(1).onclick = function(){
            window.location.hash = "PHP_debugg_log";
        }
        this.table.getRow(2).onclick = function(){
            window.location.hash = "PHP_error_log_MySQL";
        }
    }
}