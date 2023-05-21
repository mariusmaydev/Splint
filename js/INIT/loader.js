

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
    static loadByAjax(uri, sync = false){
        if(!classPath.startsWith('http') && document.currentScript.src == ""){
            return;
        }
        return new Promise(async function(resolve){
            let path = this.parseSRC(uri);
            if(SPLINT_Loader.LOADED_DOCS.includes(path)){
                resolve(false);
                return;
            }
            if(sync){
                $.ajax({
                    type: 'GET',
                    url: path,
                    async: false,
                    cache: false,
                    dataType: 'script',
                    complete: async function(data) {
                        resolve(true);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        resolve(false);
                    }
                });
            } else {
                let sc = document.createElement("script");
                    // sc.type = "text/javascript";
                    sc.src = path;
                    // sc.defer = true;
                    // sc.setAttribute("async", false);
                    if(document.currentScript != undefined){
                        document.currentScript.parentElement.insertBefore(sc, document.currentScript);
                    } else {
                        document.head.appendChild(sc);
                    }
                    sc.onload = function(){
                        SPLINT_debugger.log("ClassLoader", "loaded -> " + path, [["-", ">"], "font-weight: bold;"]);
                        resolve(true);
                    }
            }
            SPLINT_Loader.LOADED_DOCS.push(path);
        }.bind(this));
    }
    static load_Fetch(){

    }
    static bindScript(){

    }
    static bindCSS(){

    }
    static getPaths(){

    }

}