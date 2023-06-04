
class PageNavigation {
    static set src(uri){
        if(uri.startsWith("/")){
            uri = uri.slice(1);
        }
        SPLINT.Tools.Location.load.atProjectRoot("/HTML/"+ uri);
    }
    static get navPath(){
        let res = new Object();
        let a = location.href.replace(SPLINT.projectRootPath, "");
            if(a.endsWith("/")){
                a = a + "index.html";
            }
        let arfull = a.split("/");
        let ar = arfull.slice(1);
            res.file = ar[ar.length -1 ];
            ar = ar.slice(0, ar.length -1);
            let s = SPLINT.projectRootPath;
            res.path = [];
            for(const i in arfull){
                let obj = new Object();
                let e = arfull[i];
                s = s + e;
                if(!s.endsWith("/") && !s.includes("?")){
                    s = s + "/";
                    obj.fullPath = s + "index.html";
                }
                obj.pathElement = e; 
                obj.params = [];
                obj.hashes = [];
                let qIndex = s.indexOf("?");
                if(qIndex != -1){
                    obj.fullPath = s.substring(0, qIndex);
                    obj.pathElement = e.substring(0, e.indexOf(".html?")); 
                    let params = s.substring(qIndex + 1, s.indexOf("#"));
                    let p = params.split("&");
                    for(const e of p){
                        let f = e.split("=");
                        let pObj = new Object();
                            pObj[f[0]] = f[1];
                        obj.params.push(pObj)
                    }
                    let hashes = s.split("#");
                    if(hashes.length > 1){
                        hashes = hashes.slice(1);
                    }
                    obj.hashes = hashes;
                }
                if(s.includes(".html")){
                    obj.pathElement = res.path[res.path.length - 1].pathElement;
                    obj.fullPath = res.path[res.path.length - 1].fullPath;
                    res.path[res.path.length - 1] = (obj);
                    break;
                } else {
                    res.path.push(obj);
                }
            }
            res.log();
            return res;
    }
}