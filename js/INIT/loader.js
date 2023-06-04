

class SPLINT_LOADER extends SPLINT_LOADER_helper {
    static cacheResources = false;
    static isLoaded(URI){
        return SPLINT_Loader.LOADED_DOCS.includes(URI);
    }
    static parseSRC(URIin){
        let path = null;
        if(URIin.startsWith('@')){
            let map = JSON.parse(document.getElementById("SPLINT_importmap").innerHTML).imports;
            let a = URIin.substring(0, URIin.indexOf('/') + 1);
            if(map.hasOwnProperty(a)){
                path = URIin.replace(a, map[a]);
            }
        } else if(URIin.startsWith('http') || URIin.startsWith('https')){
            path = URIin;
        } else {
            if(document.currentScript == null || document.currentScript.src == ""){
                return null;
            }
            let src;
            if(URIin.startsWith('../')){
                URIin = URIin.replace('../', "")
                src = document.currentScript.src.split('/').slice(0, -2).join('/') + "/";
            } else {
                src = document.currentScript.src.split('/').slice(0, -1).join('/') + "/";
            }
            path = src + URIin;
        }
        if(path.endsWith("/")){
            return Splint_bindJS.getProjectPATH(path);
        }
        return path;
    }

}