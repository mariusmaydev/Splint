

class SPLINT {
    static loadedScripts = [];
    static #config = null;
    static PATH = new Object();
    static async start(){
        console.log("start")
        return await SPLINT_Loader.start();
    }
    static {
        document.currentScript.onload = function(){
            SPLINT_Loader.start();
        }
        this.config = new Object();
        window.SPLINT = SPLINT;
    }
    static get Events(){
        return S_Events;
    }
    static get DataStorage(){
        return S_DataStorage;
    }
    static get DOMElement(){
        return DOMElement;
    }
    static get EX(){
        return SPLINT_Experimental;
    }
    static get SessionsPHP(){
        return S_SessionsPHP;
    }
    static get autoObject(){
        return autoObject;
    }
    static get SArray(){
        return SArray;
    }
    static get debugger(){
        return SPLINT_debugger;
    }
    static get CallPHP(){
        SPLINT.require_now('@SPLINT_ROOT/DataManagement/callPHP/CallPHP.js');
        return S_CallPHP;
    }
    static get ViewPort(){
        SPLINT.require_now('@SPLINT_ROOT/vanillaExtensions/windowExtensions.js');
        return ViewPort;
    }
    static get API(){
        return S_API;
    }
    static require_now(uri){
        return SPLINT_loaderHelper.loadScript(uri, true);
    }
    static require(uri){
        return SPLINT_loaderHelper.loadScript(uri);
    }
    static Tools = class {
        static get Location(){
            return nS_Location;
        }
        static get parse(){
            return S_Tparser;
        }
    }
    static get Utils(){
        return S_Utils;
    }
    static get CONFIG(){
        if(SPLINT.#config == null){
            try {
                let projectName = location.pathname.split('/')[1];
                SPLINT.#config = SPLINT_loaderHelper.getConfig(projectName)
            } catch {
                let projectName = location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2];
                SPLINT.#config = SPLINT_loaderHelper.getConfig(projectName)
            }
            return SPLINT.#config;
        }
        return SPLINT.#config;
    }
    // static isDebuggMode(){
    //     return this.CONFIG.settings.debugging;
    // }
    static log(){
        SPLINT.debugger.logUser(SPLINT);
    }
}
class S extends SPLINT {};

const SPLINT_loadedDocs = [];
class SPLINT_loaderHelper {
    static loadScript(classPath, sync = false){
        if(!classPath.startsWith('@') && !classPath.startsWith('http') && (document.currentScript != null &&document.currentScript.src == "")){
            console.warn(classPath);
            return;
        }
        return new Promise(function(resolve){
            let path;
            if(classPath.startsWith('@')){
                let map = JSON.parse(document.getElementById("SPLINT_importmap").innerHTML).imports;
                let a = classPath.substring(0, classPath.indexOf('/')+1);
                if(map.hasOwnProperty(a)){
                    path = classPath.replace(a, map[a]);
                }
            } else if(classPath.startsWith('http')){
                path = classPath;
            } else {
                let src;
                if(classPath.startsWith('../')){
                    classPath = classPath.replace('../', "")
                    src = document.currentScript.src.split('/').slice(0, -2).join('/') + "/";
                } else {
                    src = document.currentScript.src.split('/').slice(0, -1).join('/') + "/";
                }
                path = src + classPath;
            }
            if(SPLINT_Loader.LOADED_DOCS.includes(path)){
                console.log(path);
                resolve(false);
                return;
            }
            // if(sync){
                let lastScript = document.currentScript;
                var req = new XMLHttpRequest();
                req.open('GET', path, !sync);
                req.onreadystatechange = async function(){
                    if (req.readyState == 4) {
                        if(req.responseText.includes("SPLINT.require_now")){
                            let res = req.responseText.match(/(?<=SPLINT.require_now\(['"]).*(?=['"]\))/g);
                            for(const r of res){
                                await SPLINT.require_now(r);
                            }
                        }
                        var s = document.createElement("script");
                            s.async = !sync;
                            // s.defer = true;
                        s.appendChild(document.createTextNode(req.responseText));
                        if(sync){
                            console.log("ok")
                            document.head.insertBefore(s, document.head.firstChild);
                        } else {
                            document.head.appendChild(s);
                        }
                    resolve(true);
                    }
                };
                SPLINT_Loader.LOADED_DOCS.push(path);
                req.send(null);

                // let a = $.ajax({
                //     beforeSend: function(){
                        
                //     },
                //     dataFilter :function(data){
                //         // console.log(data);
                //         // console.dir(arguments)
                //         let res1 = data
                //         // console.dir(document)
                //         // console.dir( data)
                //         if(data.includes("SPLINT.require_now")){
                //             res1 = null;
                //             let res = data.match(/(?<=SPLINT.require_now\(['"]).*(?=['"]\))/g);
                //             for(const r of res){
                //                 SPLINT.require_now(r)
                //             }
                //         }
                //         let sc = document.createElement("script");
                //             // sc.setAttribute("src", path);  
                //             // sc.setAttribute("async", true);
                //             sc.innerHTML = data;
                //             document.body.insertBefore(sc, document.currentScript);
                //             console.log("data");
                //         // return eval.call(window, data);
                //         return null;
                //     },
                //     type: 'GET',
                //     url: path,
                //     async: !sync,
                //     cache: false,
                //     dataType: 'script',
                //     // context: document,
                //     // isModified: false,
                //     // credentials: "include",
                //     complete: function(data) {
                //         // console.dir(arguments)
                //     //   eval(data)
                //     // //   myFunction();
                //         // let sc = document.createElement("script");
                //         //     sc.setAttribute("src", path);  
                //         //     sc.setAttribute("async", false);
                //         //     sc.innerHTML = eval(data);
                //         //     document.body.insertBefore(sc, document.currentScript);
                //             // console.log("data");
                //             resolve(true);
                //     //         sc.onload = function(){
                //     //             SPLINT_debugger.log("ClassLoader", "loaded -> " + path, [["-", ">"], "font-weight: bold;"]);
                //     //             resolve(true);
                //     //         }
                //     },
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {
                //         console.error(arguments)
                //     resolve(false);
                //     }
                // }).done(function(){
                //     resolve(true);
                // });

                // console.log(a)
            // } else {
                
            //     $.ajax({
            //         type: 'GET',
            //         url: path,
            //         async: true,
            //         cache: false,
            //         dataType: 'script',
            //         complete: async function(data) {
            //             resolve(true);
            //         },
            //         error: function (XMLHttpRequest, textStatus, errorThrown) {
            //             resolve(false);
            //         }
            //     });
            //     // let sc = document.createElement("script");
            //     //     // sc.type = "text/javascript";
            //     //     sc.src = path;
            //     //     // sc.defer = true;
            //     //     // sc.setAttribute("async", false);
            //     //     if(document.currentScript != undefined){
            //     //         document.currentScript.parentElement.insertBefore(sc, document.currentScript);
            //     //     } else {
            //     //         document.head.appendChild(sc);
            //     //     }
            //     //     sc.onload = function(){
            //     //         SPLINT_debugger.log("ClassLoader", "loaded -> " + path, [["-", ">"], "font-weight: bold;"]);
            //     //         resolve(true);
            //     //     }
            // }
        })
    }
    static loadSplintScript(classPath, defer = false){
        return SPLINT_loaderHelper.loadScript(window.location.origin + "/Splint/js" +  classPath, true);
        return new Promise(async function(resolve){
            // let path = "/Splint/js" +  classPath;
            // let sc = document.createElement("script");
            //     sc.src = window.location.origin + path;
            //     // sc.defer = defer;
            //     // sc.setAttribute("async", "false");
            //     document.documentElement.appendChild(sc)
            //     sc.onload = function(){
            //         SPLINT_Loader.LOADED_DOCS.push(window.location.origin + path);
            //         SPLINT_debugger.log("ClassLoader", "loaded -> " + path, [["-", ">"], "font-weight: bold;"]);
            //         resolve(true);
            //     }
        })
    }
    static async createCommonLinkTag(src){
        if(SPLINT_Loader.LOADED_DOCS.includes(src)){
            return;
        }
        SPLINT_Loader.LOADED_DOCS.push(src);
        let tag = document.createElement('link');
            tag.href =  src + "?v=" + (new Date()).getTime();
            // tag.defer = true;
            tag.rel = "stylesheet";
            // tag.setAttribute("async", "false");
        document.head.appendChild(tag);
        await getPromiseFromEvent(tag, "load");
    }
    static async createCommonScriptTag(src){
        // if(SPLINT_Loader.LOADED_DOCS.includes(src)){
        //     return;
        // }
        // SPLINT_Loader.LOADED_DOCS.push(src);
        this.loadScript(src, false);
        // let tag = document.createElement('script');
            // tag.src = src + "?v=" + (new Date()).getTime();
            // tag.defer = true;
            // tag.type = "text/javascript";
            // tag.setAttribute("async", "false");
        // document.body.appendChild(tag);
        // await getPromiseFromEvent(tag, "load");
    }
    static getConfig(projectPath){
        let uri = location.origin + "/" + projectPath + "/" + "splint.config/config.main.json";
        
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", uri, false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0){
                    return rawFile.responseText;
                } else {
                    return false;
                }
            }
        }

        rawFile.send(null);
        return JSON.parse(rawFile.responseText);
    }
}

class SPLINT_Loader extends SPLINT_loaderHelper{
    static LOADED_DOCS = [];
    static async start(){
        await this.loadJQuery();
        await this.loadConfig();
        await this.loadImportMap();
        await Splint_bindJS.loadPATH();
        await this.bind().CSS();
        await Promise.all([SPLINT.require("@SPLINT_ROOT/Tools/debugger.js"),
        SPLINT.require("@SPLINT_ROOT/Tools/json.js"),
        SPLINT.require("@SPLINT_ROOT/dataTypes/SArray.js"),
        SPLINT.require("@SPLINT_ROOT/dataTypes/autoObject.js")]);

        this.loadGoogleLogin();
        // await this.#bindLoaderHelper();
        this.bind().PRE();
        // this.loadThreeJS();
        this.bind().ALL();
        
        console.dir(SPLINT);
    }
    /**
     * @return  {Object}  config file object
     */
    static async loadConfig(){
        return new Promise(async function(resolve){
            try {
                let projectName = location.pathname.split('/')[1];
                SPLINT.config.main = SPLINT_loaderHelper.getConfig(projectName)
            } catch {
                let projectName = location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2];
                SPLINT.config.main = SPLINT_loaderHelper.getConfig(projectName)
            }
            this.getRootDir();
            resolve(SPLINT.config.main);
            return SPLINT.config.main;
        }.bind(this));
    }
    static getRootDir(){
        let port = "";
        if(SPLINT.config.main.port != ""){
            port = ":" + SPLINT.config.main.port;
        }
        // SPLINT.rootPath = SPLINT.config.main.SSL + "://" + SPLINT.config.main.host + port + "/Splint";
        SPLINT.rootPath = window.location.origin + "/Splint";
        SPLINT.projectRootPath = window.location.origin + SPLINT.config.main.paths.project_root;
        SPLINT.cssRootPath = window.location.origin + SPLINT.config.main.paths.css_root;
    }
    // static get
    static bind(){
        return Splint_bindJS;
    }
    static async loadChartJS(){
        let tag = document.createElement("script");
            tag.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.1.1/chart.js";
            tag.type = "text/javascript";
            tag.defer = true;
            tag.setAttribute("async", false);
            document.head.appendChild(tag);
            await getPromiseFromEvent(tag, "load");
    }
    static async loadJQuery(){
        let tag = document.createElement("script");
            tag.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
            document.body.appendChild(tag);
            await getPromiseFromEvent(tag, "load");
    }
    static loadGoogleLogin(){
        let tag = document.createElement("script");
            tag.src = "https://accounts.google.com/gsi/client";
            document.body.appendChild(tag);
            getPromiseFromEvent(tag, "load");
    }
    static loadImportMap(){
        let tag = document.createElement("script");
            tag.setAttribute("type", "importmap");
            tag.setAttribute("id", "SPLINT_importmap");
            let mapJSON = {
                "imports": {
                  "SPLINT"                  : SPLINT.rootPath + "/js/modules/ThreeJS/CORE.js",
                  "splint"                  : SPLINT.rootPath + "/js/modules/ThreeJS/CORE.js",
                  "threeJS"                 : SPLINT.rootPath + "/lib/threeJS/build/three.module.js",
                  "three"                   : SPLINT.rootPath + "/lib/threeJS/build/three.module.js",
                  "@THREE_ROOT_DIR/"        : SPLINT.rootPath + "/lib/threeJS/",
                  "@THREE_MODULES_DIR/"     : SPLINT.rootPath + "/lib/threeJS/examples/jsm/",
                  "@SPLINT_MODULES_DIR/"    : SPLINT.rootPath + "/js/modules/",
                  "@SPLINT_THREE_DIR/"      : SPLINT.rootPath + "/js/modules/ThreeJS/",
                  "@PROJECT_ROOT/"          : SPLINT.projectRootPath + "js/",
                  "@SPLINT_ROOT/"           : SPLINT.rootPath + "/js/",
                  "@NODE_MODULES_DIR/*"     : SPLINT.rootPath + "/node_modules/"
                }
              }
            tag.innerHTML = JSON.stringify(mapJSON, null, 2);
            document.body.appendChild(tag);
            getPromiseFromEvent(tag, "load");
    }
}

function getPromiseFromEvent(item, event) {
    return new Promise((resolve) => {
      const listener = () => {
        item.removeEventListener(event, listener);
        resolve();
      }
      item.addEventListener(event, listener);
    })
  }


class Splint_bindJS {
    static async #createtag(src, type = "js"){
        if(SPLINT_Loader.LOADED_DOCS.includes(src)){
            return;
        }
        SPLINT_Loader.LOADED_DOCS.push(src);
        if(type === "js"){
            // let tag = document.createElement('script');
            // tag.type = "text/javascript";
            // tag.defer = true;
            // tag.setAttribute("async", "false");
            // tag.src = src //+ //"?v=" + (new Date()).getTime();
            // // S_Loader.loadScriptByAjax(src);
            // document.body.appendChild(tag);
            await getPromiseFromEvent(tag, "load");
        } else if(type === 'css'){
            let tag = document.createElement('link');
            tag.href = SPLINT.rootPath + src;
            tag.rel = "stylesheet";
            document.head.appendChild(tag);
        } else if(type === 'php'){
            let tag = document.createElement('script');
            tag.src = SPLINT.rootPath + src;
            document.body.appendChild(tag);
            await getPromiseFromEvent(tag, "load");
        }
    }
    static loadPATH(src){
        $.ajax({
            type: 'GET',
            url: SPLINT.rootPath + "/loadFolderFromHTML.php",
            async: false,
            cache: true,
            dataType: 'JSON',
            success: function(data) {
                SPLINT.PATH.project = data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                SPLINT.debugger.error("loader", "")
            }
        });
        $.ajax({
            type: 'GET',
            url: SPLINT.rootPath + "/loadFromHTML.php",
            async: false,
            cache: true,
            dataType: 'JSON',
            success: function(data) {
                SPLINT.PATH.splint = data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                SPLINT.debugger.error("loader", "")
            }
        });
    }
    static getSplintPATH(uri_part){
        let stack = [];
        for(const e of SPLINT.PATH.splint.JS){
            if(e.includes(uri_part)){
                stack.push(uri_part);
            }
        }
        return stack;
    }
    static getProjectPATH(uri_part){
        let stack = [];
        for(const e of SPLINT.PATH.project.JS){
            if(e.includes(uri_part)){
                stack.push(uri_part);
            }
        }
        return stack;
    }
    static async CSS(){
        let parts = document.querySelectorAll("part[style]");
        console.dir(parts)
        // console.log(Object.keys(parts))
        for(const e of parts){
            let src = SPLINT.cssRootPath + e.getAttribute("src");
            console.log(src)
            if(SPLINT_Loader.LOADED_DOCS.includes(src)){
                continue;
            }
            // SPLINT_Loader.LOADED_DOCS.push(src);
            if(src.substr(src.lastIndexOf(".") + 1) == "css"){
                if(src.substring(0, 1) == "/"){
                    await SPLINT_loaderHelper.createCommonLinkTag(src);
                    continue;
                }
                await SPLINT_loaderHelper.createCommonLinkTag(src);
            }
        }
    }
    static async PRE(){
        let pre_parts = document.querySelectorAll("part[pre]");
        for(let i = 0; i < pre_parts.length; i++){
            console.dir(pre_parts);
            let src = (pre_parts[i].getAttribute("src"));
            // if(SPLINT_Loader.LOADED_DOCS.includes(src)){
            //     continue;
            // }
            // SPLINT_Loader.LOADED_DOCS.push(src);
                    await SPLINT.require_now(SPLINT.projectRootPath + src.replace("/", ""));
            // if(src.substr(src.lastIndexOf(".") + 1) == "js"){
            //     if(src.substring(0, 1) == "/"){
            //         await SPLINT_loaderHelper.createCommonScriptTag(SPLINT.projectRootPath + src.replace("/", ""));
            //         continue;
            //     }
            //     await SPLINT_loaderHelper.createCommonScriptTag(src);
            // } else {
            //     // await this.getProjectPATH(src.replace("/", ""));
            //     // for(let e = 0; e < SPLINT.PATH.project.JS.length; e++){
            //     //     await SPLINT_loaderHelper.createCommonScriptTag(SPLINT.PATH.project.JS[e]);
            //     // }
            // }
        }
    }
    static async ALL(){
        let stack = [];
        SArray.assort(SPLINT.PATH.splint.JS, "/");
        for(const file of SPLINT.PATH.splint.JS){
            stack.push(SPLINT_loaderHelper.loadScript(file, false));
            // await this.#createtag(file, "js");
        }
        await Promise.all(stack)
        this.modules();
        await this.parts();
        this.loader();
        // this.removeSplintTags();
    }
    static loader(){
        let src = document.getElementsByTagName("loader").item(0).getAttribute("src");
        if(src.substring(0, 1) == "/"){
            src = SPLINT.projectRootPath + src.replace("/", "");
        }
        console.dir(SPLINT);
        SPLINT.require_now(src)
        // let tag3 = document.createElement('script');
        // tag3.src = src + "?v=" + (new Date()).getTime();
        // tag3.setAttribute("async", "false");
        // tag3.defer = true;
        // tag3.type = "text/javascript";
        // document.body.appendChild(tag3);
    }
    static async parts(){
        // return SPLINT_loaderHelper.loadScript(window.location.origin + "/Splint/js" +  classPath, true);
        let parts = document.querySelectorAll('part:not([style])');
        let e = [];

        for(const [key, val] of Object.entries(parts)){
            // let src = val.getAttribute("src");
            // this.getProjectPATH(src.replace("/", ""))
            let v = val.getAttribute("src");
            if(v.endsWith("/")){
                continue;
            }
            e.push(SPLINT.projectRootPath + v.replace("/", ""));
            // console.dir(val)
        }
        // p = p.forEach(function(v, i, sa){
            // return v
            // console.dir(arguments)
        // });
        // SArray.assort(e, "/");
        for(const f of e){
            await SPLINT_loaderHelper.createCommonScriptTag(f);
        }
        // for(let i = 0; i < parts.length; i++){
        //     let src = S_JSON.parseIf(parts[i].getAttribute("src"));
        //     if(src.substr(src.lastIndexOf(".") + 1) == "js"){
        //         if(src.substring(0, 1) == "/"){
        //             await SPLINT_loaderHelper.createCommonScriptTag(SPLINT.projectRootPath + src.replace("/", ""));
        //             continue;
        //         }
        //         await SPLINT_loaderHelper.createCommonScriptTag(src);
        //     } else {
        //         await SPLINT_loaderHelper.createCommonScriptTag(src);
        //         // await this.getProjectPATH(src.replace("/", ""));
        //         // for(let e = 0; e < SPLINT.PATH.project.JS.length; e++){
        //         //     await SPLINT_loaderHelper.createCommonScriptTag(SPLINT.PATH.project.JS[e]);
        //         // }
        //     }
        // }
    }
    static modules(){
        let parts = document.getElementsByTagName("module");
        for(let i = 0; i < parts.length; i++){
            let src = parts[i].getAttribute("src");
            if(src.substring(0, 1) == "/"){
                src = SPLINT.projectRootPath + src.replace("/", "");
            }
            let tag = document.createElement('script');
                tag.type = "module";
                tag.src = src.replace("@PROJECT_SRC_ROOT/", SPLINT.config.main.paths.project_root);
                tag.async = true;
                tag.defer = true;
            document.body.appendChild(tag);
        }
    }
    static removeSplintTags(){
        for(let i = 0; i < document.getElementsByTagName("part").length; i++){
            let element = document.getElementsByTagName("part")[i];
            element.remove();
        }
        for(let i = 0; i < document.getElementsByTagName("module").length; i++){
            let element = document.getElementsByTagName("module")[i];
            element.remove();
        }
        document.getElementsByTagName("loader")[0].remove();
    }
}


