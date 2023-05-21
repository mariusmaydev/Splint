
class SP_inspectProjects {
    static async inspect(){
        let obj = new Object();
            obj.URI = window.location.origin;
        let res = await SPLINT.DataStorage.AccessSplint("FILES.STRUCT.GET", obj)
        for(const i in res){
            let e = res[i];
            res[i] = e.replaceAll("\\", "/");
            let uri = location.origin + "/" + res[i].split("/").splice(3).join("/");
            res[i] = new Object();
            res[i].uri = uri;
            res[i].config = await SPLINT.Utils.Files.read(uri + "/config.main.json", false).then(function(res){
                return SPLINT.Tools.parse.toJSON(res);
            });
        }
        return res;
    }
}