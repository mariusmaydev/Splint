
class S_DataStorage extends SPLINT.CallPHP.Manager {
    static PATH = SPLINT.PATHS.Access;
    static edit(path, content = ""){
        let call = this.callPHP("EDIT");
            call.data.path    = path;
            call.data.content = content;
        return call.send();
    }
    static get(path){
        let call = this.callPHP("GET");
            call.data.path = path;
        return call.send();
    }
    static AccessSplint(method, obj){
        let call = this.callPHP(method);
            call.data = obj;
        return call.send();
    }
}