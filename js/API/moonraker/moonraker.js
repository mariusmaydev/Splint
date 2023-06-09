
class S_moonraker {
    static {
        this.domain = SPLINT.config.main.moonraker.SSL + "://" + SPLINT.config.main.moonraker.host;
        this.PATH = SPLINT.PATHS.php.moonraker;
    }
    static async test(){
        let call = new SPLINT.CallPHP(this.PATH, "TEST");
        
        let res = call.send();
        return res;
    }
    static getServerInfo(){
        return this.#call("/server/info", "GET");
    }
    static cancelPrint(){
        return this.#call("/printer/print/cancel", "POST")
    }
    static pausePrint(){
        return this.#call("/printer/print/pause", "POST")
    }
    static resumePrint(){
        return this.#call("/printer/print/resume", "POST")
    }
    static startPrint(fileName){
        let path = "/printer/print/start?filename=" + fileName + ".gcode";
        return this.#call(path, "POST");
    }
    static loadGCode(path){
        return SPLINT.Utils.Files.read(path);
    }
    static async uploadGCode(code, name){    
        return new Promise(async function(resolve){
            let data         = new FormData();
                data.append("file", new File([code], name + ".gcode", {type : "text/plain"}));
            let ajaxData = new Object();
                ajaxData.url          = this.domain + "/server/files/upload";
                ajaxData.type         = "POST";
                ajaxData.contentType  = false;
                ajaxData.processData  = false;
                ajaxData.data         = data;
                ajaxData.async        = true;
                ajaxData.success      = function(data){
                    resolve(data);
                    console.log(data)
                }.bind(this);
                ajaxData.error      = function(data){
                    resolve(data);
                }.bind(this);
            $.ajax(ajaxData);
        }.bind(this));
    }
    static async #call(path, method, sync = false){
        return new Promise(async function(resolve){
        let uri = this.domain + path;
            let rawFile = new XMLHttpRequest();
            rawFile.open(method, uri, !sync);
            rawFile.setRequestHeader('Content-type', 'application/json');
            rawFile.onreadystatechange = function() {
                console.dir(rawFile)
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0){
                        resolve(SPLINT.Tools.parse.toJSON(rawFile.responseText));
                    } else {
                        resolve(false);
                    }
                }
            }
            rawFile.send();
        }.bind(this));
    }
}