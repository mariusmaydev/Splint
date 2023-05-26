
class SPLINT {
    static loadedScripts = [];
    static #config = null;
    static PATH = new Object();
    static async start(){
        console.log("start")
        SPLINT_Loader.start();
    }
    static {
        this.config = new Object();
        window.SPLINT = SPLINT;
    }
    static get Events(){
        return S_Events;
    }
    static get DataStorage(){
        return S_DataStorage;
    }
    static get BufferStorage(){
        return S_BufferStorage;
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
    static get Error(){
        return SplintError;
    }
    static get CallPHP(){
        return S_CallPHP;
    }
    static get ViewPort(){
        return ViewPort;
    }
    static get API(){
        return S_API;
    }
    static require_now(uri){
        return SPLINT_loaderHelper.loadScript(uri, true);
    }
    static require(uri, type = null){
        return SPLINT_loaderHelper.loadScript(uri, false, type);
    }
    static Tools = class {
        static get Location(){
            return nS_Location;
        }
        static get parse(){
            return S_Tparser;
        }
        static get DateTime(){
            return S_DateTime;
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
    static async loadScript(classPath, sync = false, type = null){
        let obj1 = new Object();
            obj1.resolved = false;
        let path = SPLINT_LOADER.parseSRC(classPath);
            obj1.path = path;
        for(const key in SPLINT_Loader.LOADED_DOCS2){
            let e = SPLINT_Loader.LOADED_DOCS2[key];
            if(e.path == path){
                if(sync){
                    obj1 = e;
                } else {
                    return e.promise;
                }
            }
        }
        SPLINT_Loader.LOADED_DOCS2.push(obj1);
        
        obj1.promise =  new Promise(async function(resolve, reject){
            // let sc = document.createElement("script");
            // sc.type = "text/javascript"
            // sc.async = true;
            // sc.id = Math.random();
            // document.head.appendChild(sc)
            if(sync){
                $.ajax({
                    beforeSend: function(){
                    },
                    dataFilter : function(data){
                        if(data.includes("SPLINT.require_now")){
                            let res = data.match(/(?<=SPLINT.require_now\(['"]).*(?=['"]\))/g);
                            for(const r of res){
                                SPLINT.require_now(r);
                            }
                        }
                        if(obj1.resolved){
                            return "";
                        } else {
                            return data;
                        }
                    },
                    type: 'GET',
                    url: path,
                    async: !sync,
                    cache: SPLINT.CONFIG.settings.cacheResources,
                    dataType: 'script',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        reject(arguments);
                    }
                }).done(function(){
                    obj1.resolved = true;
                    resolve(true);
                });
            } else {
                function load(){
                    let tag = document.createElement('script');
                    tag.type = "text/javascript";
                    if(SPLINT.CONFIG.settings.cacheResources){
                        tag.src = path;
                    } else {
                        tag.src = path + "?v=" + Math.round(Date.now()/1000);
                    }
                    tag.defer = true;
                    if(type != null){
                        tag.type = type;
                    }
                    tag.setAttribute("async", "true");
                    // S_Loader.loadScriptByAjax(src);
                    tag.onload = function(){
                        obj1.resolved = true;
                        resolve(true)
                    };
                    tag.onerror = function(){
                        SPLINT.Error.FileNotFound(path);
                        // SPLINT.debugger.error("init - loader", "try reloading is you have changed the file tree")
                        Splint_bindJS.loadPATH(true);
                        SPLINT_loaderHelper.queryPaths();
                        // load();
                        obj1.resolved = true;

                        reject(false);
                    }
                    document.body.appendChild(tag);
                }
                load();

            }
        }.bind(this))

        return obj1.promise;
    }
    static async initLoader(){
            let f = async function(uri){
                let path = Splint_bindJS.getSplintPATH("/Splint/js" + uri)[0];
                for(const e of SPLINT_Loader.LOADED_DOCS2){
                    if(e.path == path){
                        return e.promise;
                    }
                }
                let promise = $.ajax({
                        beforeSend: function(){
                        },
                        dataFilter :function(data){
                            // String
                            const regexp = /\r\n/g;
                            const str = data;
                            const matches = str.matchAll(regexp);
                            let last = 0;
                            let flag = false;
                            let substr = "";
                            for (const match of matches) {
                                substr = data.substring(last, match.index)
                                if(/\S/.test(substr) && !substr.includes("SPLINT.require")){
                                    if(flag){
                                        break;
                                    }    
                                    flag = true;

                                } else if(substr.includes("SPLINT.require")){
                                    flag = false;
                                }
                                last = match.index + match.length;
                              }
                            substr = data.substring(0, last);

                            if(substr.includes("SPLINT.require")){
                                let res = substr.match(/(?<=SPLINT.require_now\(['"]).*(?=['"]\))/g);
                                let res1 = substr.match(/(?<=SPLINT.require\(['"]).*(?=['"]\))/g);
                                if(res != null){
                                    for(const r of res){
                                        SPLINT.require_now(r)
                                    }
                                }
                                if(res1 != null){
                                    for(const r of res1){
                                        SPLINT.require(r)
                                    }
                                }
                            }
                            let f = document.createElement("script");
                            let a = document.createTextNode(data);    
                            f.appendChild(a);
                            document.body.appendChild(f);
                            return data;
                        },
                        type: 'GET',
                        url: path,
                        async: true,
                        cache: SPLINT.CONFIG.settings.cacheResources,
                        dataType: 'text',
                    }).done(function(){
                        return true;
                    });
                    
                SPLINT_Loader.LOADED_DOCS2.push({path: path, promise: promise});
                return promise;
            }.bind(this);
        return Promise.all([
                f("/INIT/loaderHelper.js").then(function(){
                    return f("/INIT/loader.js");
                }),
                f("/paths.js")]);
    }
    static async createCommonLinkTag(src){
        for(const e of SPLINT_Loader.LOADED_DOCS2){
            if(e.path == src){
                return e.promise;
            }
        }
        let obj = new Object();
        obj.path = src;
        obj.resolved = false;
        obj.promise =  new Promise(async function(resolve, reject){
            let tag = document.createElement('link');
            tag.rel = "stylesheet";
            if(SPLINT.CONFIG.settings.cacheResources){
                tag.href = src;
            } else {
                tag.href = src + "?v=" + (new Date()).getTime();
            }
            tag.defer = true;
            tag.type = "text/css";
            tag.setAttribute("async", "true");
            document.head.appendChild(tag);
            tag.onload = function(){
                resolve(true);
            }
            tag.onerror = function(){
                SPLINT.Error.FileNotFound(src);
                resolve(false);
            }
            return true;
        })
        SPLINT_Loader.LOADED_DOCS2.push(obj)
        return obj.promise;
    }
    static getConfig(projectPath){
        let uri = location.origin + "/" + projectPath + "/Splint/" + "splint.config/config.main.json";
        
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
    static LOADED_DOCS2 = [];
    static async start(){
        return new Promise(async function(resolve, reject){
            this.loadGoogleIcons();
            await Promise.all([
                this.loadJQuery(),
                this.loadConfig()]);
            await Promise.all([
                this.loadImportMap(),
                Splint_bindJS.loadPATH()]);
                // Splint_bindJS.preload();
            SPLINT_loaderHelper.initLoader().then(async function(){
                this.bind().CSS();
                await Promise.all([
                    SPLINT.require("@SPLINT_ROOT/Utils/ANSI.js"),
                    SPLINT.require("@SPLINT_ROOT/Events/Events.js"),
                    SPLINT.require("@SPLINT_ROOT/DataManagement/callPHP/CallPHP.js"),
                    SPLINT.require("@SPLINT_ROOT/Utils/debugger/SplintError.js"),
                    SPLINT.require("@SPLINT_ROOT/Utils/debugger/debugger.js"),
                    SPLINT.require("@SPLINT_ROOT/Tools/json.js"),
                    SPLINT.require("@SPLINT_ROOT/dataTypes/SArray.js"),
                    SPLINT.require("@SPLINT_ROOT/dataTypes/autoObject.js")
                    ]);
                this.bind().MODULES();
                this.bind().PRE().then(async function(){
                    await this.loadChartJS();
                    await this.bind().ALL();
                    resolve(true);
                }.bind(this));
                // this.loadGoogleLogin();
                // await this.#bindLoaderHelper();
            }.bind(this));
        }.bind(this)).then(async function(){
            await Splint_bindJS.loader();
            Splint_bindJS.removeSplintTags();
            let f = []
            for(const e of Object.values(SPLINT_Loader.LOADED_DOCS2)){
                f.push(e.promise);
            }
            Promise.all(f).then(function(){
                SPLINT.Events.onInitComplete.dispatch();
            })
            return true;
        }.bind(this))
        
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
            let port = "";
            if(SPLINT.config.main.port != ""){
                port = ":" + SPLINT.config.main.port;
            }
            // SPLINT.rootPath = SPLINT.config.main.SSL + "://" + SPLINT.config.main.host + port + "/Splint";
            SPLINT.rootPath = window.location.origin + "/Splint";
            SPLINT.projectRootPath = window.location.origin + SPLINT.config.main.paths.project_root;
            SPLINT.cssRootPath = window.location.origin + SPLINT.config.main.paths.css_root;
            resolve(SPLINT.config.main);
            return SPLINT.config.main;
        });
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
            tag.setAttribute("async", true);
            document.head.appendChild(tag);
            return getPromiseFromEvent(tag, "load");
    }
    static async loadJQuery(){
        let tag = document.createElement("script");
            tag.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
            tag.setAttribute("async", true);
            document.body.appendChild(tag);
        return getPromiseFromEvent(tag, "load");
    }
    static loadGoogleLogin(){
        let tag = document.createElement("script");
            tag.src = "https://accounts.google.com/gsi/client";
            document.body.appendChild(tag);
            getPromiseFromEvent(tag, "load");
    }
    static async loadGoogleIcons(){
        let link = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,1&display=block";
        let tag1 = document.createElement('link');
            tag1.rel = "preconnect";
            tag1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(tag1);
        let tag = document.createElement("link");
            tag.href = link;
            tag.rel = "stylesheet";
            tag.async = true;
            document.head.appendChild(tag);
        return;
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
    static async preload(){
        async function f(obj, as){
            for(const entry of obj){
                function load(){
                    let tag = document.createElement('link');
                    tag.rel = "preload";
                    if(SPLINT.CONFIG.settings.cacheResources){
                        tag.href = entry;
                    } else {
                        tag.href = entry + "?v=" + (new Date()).getTime();
                    }
                    tag.as = as;
                    tag.setAttribute("async", "true");
                    document.head.appendChild(tag);
                    tag.oerror = function(){
                        Splint_bindJS.loadPATH(true);
                        load();
                        console.log(arguments);
                    }
                }
                load();
            }
        }
        f(SPLINT.PATH.splint.JS, "script");
        f(SPLINT.PATH.project.CSS, "stylesheet");
        return;
    }
    static async loadPATH(forceReload = true){
        return Promise.all([
            $.ajax({
                type: 'GET',
                url: SPLINT.rootPath + "/loadFolderFromHTML.php?forceReload=" + forceReload + "&projectName=" + SPLINT.config.main.projectName,
                async: true,
                cache: false,
                dataType: 'JSON',
                success: function(data) {
                    SPLINT.PATH.project = data;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    SPLINT.debugger.error("loader", "")
                }
            }),
            $.ajax({
                type: 'GET',
                url: SPLINT.rootPath + "/loadFromHTML.php?forceReload=" + forceReload + "&projectName=" + SPLINT.config.main.projectName,
                async: true,
                cache: false,
                dataType: 'JSON',
                success: function(data) {
                    SPLINT.PATH.splint = data;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    SPLINT.debugger.error("loader", "")
                }
            })]);
    }
    static getSplintPATH(uri_part){
        let stack = [];
        for(const e of SPLINT.PATH.splint.JS){
            if(e.includes(uri_part)){
                stack.push(e);
            }
        }
        return stack;
    }
    static getProjectPATH(uri_part){
        let stack = [];
        for(const e of SPLINT.PATH.project.JS){
            if(e.includes(uri_part)){
                stack.push(e);
            }
        }
        return stack;
    }
    static async CSS(){
        let parts = SPLINT_LOADER.ELEMENTS.stylesheets;
        for(const e of parts){
            let src = SPLINT.cssRootPath + e.src;
            SPLINT_loaderHelper.createCommonLinkTag(src)
        }
        return;
    }
    static async PRE(){
        let stack = [];
        let parts = SPLINT_LOADER.ELEMENTS.scripts_pre;
        for(let i = 0; i < parts.length; i++){
            let val = parts[i].src;
            if(!val.startsWith("@") && !val.startsWith("http") && !val.startsWith("https")){
                val = '@PROJECT_ROOT' + val;
            }
            let f = SPLINT_LOADER.parseSRC(val.replace("/js", ""));
            if(typeof f == 'object'){
                SArray.assort(f, "/");
                for(const e of f){
                    stack.push(SPLINT.require_now(e));
                }
            } else {
                stack.push(SPLINT.require_now(f));
            }
        }
        return Promise.allSettled(stack);
    }
    static async ALL(){
        return new Promise(async function(resolve, reject){
            // this.MODULES();
            SArray.assort(SPLINT.PATH.splint.JS, "/");
            let stack = []
            for(const file of SPLINT.PATH.splint.JS){
                stack.push(SPLINT_loaderHelper.loadScript(file, false));
            }
            await Promise.all(stack);
            await this.parts();
            resolve(true);
        }.bind(this));
    }
    static async loader(){
        let src = SPLINT_LOADER.ELEMENTS.loader[0].src;
            if(!src.startsWith("@") && !src.startsWith("http") && !src.startsWith("https")){
                src = '@PROJECT_ROOT' + src;
            }
            src = SPLINT_LOADER.parseSRC(src.replace("/js", ""));
            return SPLINT.require(src);
    }
    static async parts(){
        let stack = [];
        let parts = SPLINT_LOADER.ELEMENTS.scripts;
        for(let i = 0; i < parts.length; i++){
            let val = parts[i].src;
            if(!val.startsWith("@") && !val.startsWith("http") && !val.startsWith("https")){
                val = '@PROJECT_ROOT' + val;
            }
            let f = SPLINT_LOADER.parseSRC(val.replace("/js", ""));
            if(typeof f == 'object'){
                SArray.assort(f, "/");
                for(const e of f){
                    stack.push(SPLINT.require(e));
                }
            } else {
                stack.push(SPLINT.require(f));
            }
        }
        return Promise.allSettled(stack);
    }
    static async MODULES(){
        let stack = [];
        let parts = SPLINT_LOADER.ELEMENTS.modules;
        for(let i = 0; i < parts.length; i++){
            let val = parts[i].src;
            if(!val.startsWith("@") && !val.startsWith("http") && !val.startsWith("https")){
                val = '@PROJECT_ROOT' + val;
            }
            let f = SPLINT_LOADER.parseSRC(val.replace("/js", ""));
            if(typeof f == 'object'){
                SArray.assort(f, "/");
                for(const e of f){
                    stack.push(SPLINT.require(e, 'module'));
                }
            } else {
                stack.push(SPLINT.require(f, 'module'));
            }
        }
        return Promise.allSettled(stack);
        // let parts = SPLINT_LOADER.ELEMENTS.modules;
        // for(let i = 0; i < parts.length; i++){
        //     let src = parts[i].src;
        //     if(src.substring(0, 1) == "/"){
        //         src = SPLINT.projectRootPath + src.replace("/", "");
        //     }
        //     let tag = document.createElement('script');
        //         tag.type = "module";
        //         if(SPLINT.CONFIG.settings.cacheResources){
        //             src = src.replace("@PROJECT_SRC_ROOT/", SPLINT.config.main.paths.project_root) + "?v=" + (new Date()).getTime();

        //         } else {
        //             src = src.replace("@PROJECT_SRC_ROOT/", SPLINT.config.main.paths.project_root);
        //         }
        //         SPLINT.require(src, )
        //         tag.async = true;
        //         tag.defer = true;
        //     document.body.appendChild(tag);
        // }
    }
    static removeSplintTags(){
        for(const entry of Object.entries(SPLINT_LOADER.ELEMENTS)){
            for(const element of entry[1]){
                element.element.remove();
            }
        }
    }
}

