
class SPLINT {
    static loadedScripts = [];
    static computeFlag = false;
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
    static get CONSTANTS(){
        return S_constants;
    }
    static get DataStorage(){
        SPLINT.getClass("S_DataStorage", "DataStorage");
        return S_DataStorage;
    }
    static get BufferStorage(){
        SPLINT.getClass("S_BufferStorage", "BufferStorage");
        return S_BufferStorage;
    }
    static get DOMElement(){
        SPLINT_loaderHelper.v2 = false;
        // console.trace("a");
        SPLINT.getClass("DOMElement", "DOMElement");
        return DOMElement;
    }
    static get EX(){
        return SPLINT_Experimental;
    }
    static get SessionsPHP(){
        SPLINT.getClass("S_SessionsPHP", "sessions");
        return S_SessionsPHP;
    }
    static get autoObject(){
        SPLINT.getClass("autoObject", "autoObject");
        return autoObject;
    }
    static get SArray(){
        SPLINT.getClass("SArray", "SArray");
        return SArray;
    }
    static get debugger(){
        return SPLINT_debugger;
    }
    static get Error(){
        return SplintError;
    }
    static get CallPHP(){
        SPLINT.getClass("S_CallPHP", "CallPHP");
        return S_CallPHP;
    }
    static get FileUpload(){
        SPLINT.getClass("FileUpload_S", "FileUpload");
        return FileUpload_S;
    }
    static get ViewPort(){
        return ViewPort;
    }
    static SVG = class {
        static get Loader(){
            SPLINT.getClass("SVG_Loader_S", "SVGLoader");
            return SVG_Loader_S;
        }
        static get Object(){
            SPLINT.getClass("SVG_Object_S", "SVGObject");
            return SVG_Object_S;
        }
    }
    static get API(){
        SPLINT.getClass("S_API", "API");
        return S_API;
    }
    static require_now(uri){
        return SPLINT_loaderHelper.loadScript(uri, true);
    }
    static require(uri, type = null){
        return SPLINT_loaderHelper.loadScript(uri, false, type);
    }
    static getClass(ClassName, fileName = null){
        if(fileName == null){
            fileName = ClassName;
        }
        let t = class {};
        if(typeof window[ClassName] == 'undefined'){
            for(const index in SPLINT.PATH.splint.JS){
                let element = SPLINT.PATH.splint.JS[index];
                let g = element.split("/");
                let d = g.at(-1).split(".")[0];
                if(d == fileName){
                    SPLINT.require_now(element);
                    t = Object.assign(eval(ClassName), {})
                    window[ClassName] = t;

                }
            }
            // console.dir(SPLINT.PATH.splint.JS)
        } else {
            t = window[ClassName];
        }
      return t;
    }
    static Tools = class {
        static get Location(){
            SPLINT.getClass("nS_Location", "Location");
            return nS_Location;
        }
        static get parse(){
            return S_Tparser;
        }
        static get CursorHandler(){
            SPLINT.getClass("CursorHandler_S", "cursorHandler");
            return CursorHandler_S;
        }
        static get DateTime(){
            SPLINT.getClass("S_DateTime", "DateTime");
            return S_DateTime;
        }
        static get ObjectTools(){
            SPLINT.getClass("S_ObjectTools", "objects");
            return S_ObjectTools;
        }
    }
    static Types = class {
        static get MappedObject(){
            SPLINT.getClass("S_MappedObject", "SMappedObject");
            return S_MappedObject;
        }
        static get autoObject(){
            SPLINT.getClass("autoObject", "autoObject");
            return autoObject;
        }
        static get SArray(){
            SPLINT.getClass("SArray", "SArray");
            return SArray;
        }
    }
    static Data = class {
        static get CallPHP(){
            SPLINT.getClass("S_CallPHP", "CallPHP");
            return S_CallPHP;
        }
        static get CallPHP_OLD(){
            SPLINT.getClass("CallPHP_S", "callPHP");
            return CallPHP_S;
        }
        static get Cookies(){
            SPLINT.getClass("S_Cookie", "Cookie");
            return S_Cookie;
        }
        /**
         * @deprecated
         */
        static get Cookie(){
            SPLINT.getClass("Cookie", "cookies");
            return Cookie;
        }
        static get BufferStorage(){
            SPLINT.getClass("S_BufferStorage", "BufferStorage");
            return S_BufferStorage;
        }
    }
    static get Utils(){
        SPLINT.getClass("S_Utils", "Utils");
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

const SPLINT_loadedDocs = [];
class SPLINT_loaderHelper {
    static v = true;
    static v2 = true;
    static v1 = true;
    static async loadScript(classPath, sync = false, type = null){
        let obj1 = new Object();
            obj1.resolved = false;
            // console.log("b!",classPath.endsWith("Table.js"))
        let path = SPLINT_LOADER.parseSRC(classPath);
            obj1.path = path;
        for(const key in SPLINT_Loader.LOADED_DOCS){
            let e = SPLINT_Loader.LOADED_DOCS[key];
            if(e.path == path){
                if(sync){
                    obj1 = e;
                } else {
                    return e.promise;
                }
            }
        }
        SPLINT_Loader.LOADED_DOCS.push(obj1);
        
        obj1.promise =  new Promise(async function(resolve, reject){
            // let sc = document.createElement("script");
            // sc.type = "text/javascript"
            // sc.async = true;
            // sc.id = Math.random();
            // document.head.appendChild(sc)
            let cache = false;
            if(path.includes(SPLINT.projectRootPath)){
                cache = SPLINT.config.main.settings.cacheResources.project.js
            } else if(path.includes(SPLINT.rootPath + "/js/")){
                cache = SPLINT.config.main.settings.cacheResources.splint.js
            }
            if(sync){
                // let dataType = 'text';
                // if(!SPLINT.computeFlag){
                //     dataType = 'script';
                // }(?<=\.).*(?=[,\n])
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
                    cache: cache,
                    dataType: "script",
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
                    if(cache){
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
                        Splint_bindJS.loadPATH();
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
                for(const e of SPLINT_Loader.LOADED_DOCS){
                    if(e.path == path){
                        return e.promise;
                    }
                }
                let cache = false;
                if(path.includes(SPLINT.projectRootPath)){
                    cache = SPLINT.config.main.settings.cacheResources.project.js
                } else if(path.includes(SPLINT.rootPath + "/js/")){
                    cache = SPLINT.config.main.settings.cacheResources.splint.js
                }
                let promise = $.ajax({
                        beforeSend: function(g){
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
                        cache: cache,
                        dataType: 'text',
                    }).done(function(){
                        return true;
                    });
                    
                SPLINT_Loader.LOADED_DOCS.push({path: path, promise: promise});
                return promise;
            }.bind(this);
        return Promise.allSettled([
                f("/INIT/loaderHelper.js").then(function(){
                    return f("/INIT/loader.js");
                }),
                f("/paths.js")]);
    }
    static async createCommonLinkTag(src){
        for(const e of SPLINT_Loader.LOADED_DOCS){
            if(e.path == src){
                return e.promise;
            }
        }
        let cache = false;
        if(src.includes(SPLINT.projectRootPath)){
            cache = SPLINT.config.main.settings.cacheResources.project.css
        } else if(src.includes(SPLINT.rootPath + "/scss/")){
            cache = SPLINT.config.main.settings.cacheResources.splint.css
        }
        let obj = new Object();
        obj.path = src;
        obj.resolved = false;
        obj.promise =  new Promise(async function(resolve, reject){
            let tag = document.createElement('link');
            tag.rel = "stylesheet";
            if(cache){
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
        SPLINT_Loader.LOADED_DOCS.push(obj)
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
    // static LOADED_DOCS = [];
    static async start(){
        return new Promise(async function(resolve, reject){
            this.loadGoogleIcons();
            await Promise.all([
                this.loadJQuery(),
                this.loadConfig()]);
                // console.dir(SPLINT)
                // debugger
                console.time("a");
                SPLINT_metaTagProvider.getMetaTagConfig();
                console.timeEnd("a");
                await this.loadImportMap();
                // let tag1 = document.createElement('link');
                //     tag1.rel = "modulepreload";
                //     tag1.async = true;
                //     tag1.href = "./../../../../Splint/lib/threeJS/build/three.module.min.js";
                // document.head.appendChild(tag1);
                await Splint_bindJS.loadPATH();
            // await Promise.all([
            //     this.loadImportMap(),
            //     Splint_bindJS.loadPATH()]);
            //     // let link = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,1&display=block";
            //     // Splint_bindJS.preload();
            SPLINT_loaderHelper.initLoader().then(async function(){
                this.bind().CSS();
                await SPLINT.require("@SPLINT_ROOT/Events/Events.js");
                await Promise.allSettled([
                    
                    SPLINT.require("@SPLINT_ROOT/Utils/ANSI.js"),
                    SPLINT.require("@SPLINT_ROOT/constants.js"),
                    SPLINT.require("@SPLINT_ROOT/DOMElements/DOMElementTemplate.js"),
                    SPLINT.require("@SPLINT_ROOT/DataManagement/callPHP/CallPHP.js"),
                    SPLINT.require("@SPLINT_ROOT/Utils/debugger/SplintError.js"),
                    SPLINT.require("@SPLINT_ROOT/Utils/debugger/debugger.js"),
                    SPLINT.require("@SPLINT_ROOT/Tools/json.js"),
                    SPLINT.require("@SPLINT_ROOT/dataTypes/SArray.js"),
                    SPLINT.require("@SPLINT_ROOT/dataTypes/autoObject.js")
                    ]);
                await this.bind().MODULES();
                this.bind().PRE().then(async function(){
                    // await this.loadChartJS();
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
            for(const e of Object.values(SPLINT_Loader.LOADED_DOCS)){
                f.push(e.promise);
            }
            Promise.allSettled(f).then(function(){
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
            tag.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.0/jquery.min.js";
            tag.setAttribute("async", true);
            // tag.onload = function(){
            //     fetch(this.src)
            //     .then(res => {
            //         return res.text();
            //     })
            //     .then(text => {
            //         console.log(text);
            //     });
            // }
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
        let link = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,200&display=block";
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
    static generateMetaTags(){

    }
    static loadImportMap(){
        return new Promise(function(resolve){
        let tag = document.createElement("script");
            tag.setAttribute("type", "importmap");
            tag.setAttribute("id", "SPLINT_importmap");
            let mapJSON = {
                "imports": {
                  "SPLINT"                  : SPLINT.rootPath + "/js/modules/ThreeJS/CORE.js",
                  "splint"                  : SPLINT.rootPath + "/js/modules/ThreeJS/CORE.js",
                  "three"                   : SPLINT.rootPath + "/lib/threeJS/build/three.module.min.js",
                  "@THREE_ROOT_DIR/"        : SPLINT.rootPath + "/lib/threeJS/",
                  "@THREE_MODULES_DIR/"     : SPLINT.rootPath + "/lib/threeJS/examples/jsm/",
                  "@SPLINT_MODULES_DIR/"    : SPLINT.rootPath + "/js/modules/",
                  "@SPLINT_THREE_DIR/"      : SPLINT.rootPath + "/js/modules/ThreeJS/",
                  "@PROJECT_ROOT/"          : SPLINT.projectRootPath + "js/",
                  "@SPLINT_ROOT/"           : SPLINT.rootPath + "/js/"
                }
              }
            tag.innerHTML = JSON.stringify(mapJSON, null, 2);
            document.body.appendChild(tag);
            tag.onload = function(){
                resolve(true);
            }.bind(this);
            resolve(true);
        });
    }
}

function getPromiseFromEvent(item, event) {
    return new Promise((resolve) => {
      const listener = (e) => {
        item.removeEventListener(event, listener);
        resolve();
      }
      item.addEventListener(event, listener);
    })
  }


class Splint_bindJS {
    // static async preload(){
    //     async function f(obj, as){
    //         for(const entry of obj){
    //             function load(){
    //                 let tag = document.createElement('link');
    //                 tag.rel = "preload";
    //                 if(SPLINT.CONFIG.settings.cacheResources){
    //                     tag.href = entry;
    //                 } else {
    //                     tag.href = entry + "?v=" + (new Date()).getTime();
    //                 }
    //                 tag.as = as;
    //                 tag.setAttribute("async", "true");
    //                 document.head.appendChild(tag);
    //                 tag.oerror = function(){
    //                     Splint_bindJS.loadPATH();
    //                     load();
    //                     console.log(arguments);
    //                 }
    //             }
    //             load();
    //         }
    //     }
    //     f(SPLINT.PATH.splint.JS, "script");
    //     f(SPLINT.PATH.project.CSS, "stylesheet");
    //     return;
    // }
    static async loadPATH(configIn = null){
        let config = SPLINT.config.main;
        // if(configIn == null){
        //     config = SPLINT.config.main;
        // }
        // if(res == null){
        //     res = new Object();
        // }
        return Promise.all([
            $.ajax({
                type: 'GET',
                url: SPLINT.rootPath + "/loadFolderFromHTML.php?forceReload=" + !config.settings.cacheResources.project.fileTree + "&projectName=" + config.projectName,
                async: true,
                cache: config.settings.cacheResources.project.fileTree,
                dataType: 'JSON',
                success: function(data) {
                    if(configIn == null){
                        SPLINT.PATH.project = data;
                    } else {
                        // res.a = data;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    SPLINT.debugger.error("loader", "")
                }
            }),
            $.ajax({
                type: 'GET',
                url: SPLINT.rootPath + "/loadFromHTML.php?forceReload=" + !config.settings.cacheResources.splint.fileTree + "&projectName=" + config.projectName,
                async: true,
                cache: config.settings.cacheResources.splint.fileTree,
                dataType: 'JSON',
                success: function(data) {
                    if(configIn == null){
                        SPLINT.PATH.splint = data;
                    } else {
                        // res.b = data;
                    }
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
    static async FIRST(){
        let stack = [];
        let parts = SPLINT_LOADER.ELEMENTS.scripts_first;
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
    static async ALL(computeFlag = false){
        return new Promise(async function(resolve, reject){
            // this.MODULES();

            SArray.assort(SPLINT.PATH.splint.JS, "/");

            let stack = []
            for(const file of SPLINT.PATH.splint.JS){
                
                if(!file.includes("DOMElements") && !file.includes("Utils") && !file.includes("dataTypes") && !file.includes("DataManagement") && !file.includes("API")){
                    stack.push(SPLINT_loaderHelper.loadScript(file, false));
                }
            }
            await Promise.allSettled(stack);
            await this.FIRST();
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
    }
    static removeSplintTags(){
        for(const entry of Object.entries(SPLINT_LOADER.ELEMENTS)){
            for(const element of entry[1]){
                element.element.remove();
            }
        }
    }
}

class SPLINT_metaTagProvider {
    static async getMetaTagConfig(){
        await SPLINT_metaTagProvider.loadMetaConfig();
        for(const entry of Object.entries(SPLINT.config.meta)){
           SPLINT_metaTagProvider.newTag(entry[0], entry[1]);
        }
    }
    static newTag(name, content){
        let tag = document.createElement("meta")
            tag.name = name;
            tag.content = content;
        document.head.append(tag);
    }
    static async getConfigMeta(projectPath){
        let uri = location.origin + "/" + projectPath + "/Splint/" + "splint.config/config.meta.json";
        let promise = new Promise(async function(resolve){
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", uri, true);
            rawFile.onreadystatechange = function() {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0){
                        resolve(rawFile.responseText);
                        return rawFile.responseText;
                    } else {
                        return false;
                    }
                }
            }
            rawFile.send(null);
        });
        let r = await promise;
        return JSON.parse(r);
    }
    
    /**
     * @return  {Object}  config file object
     */
    static async loadMetaConfig(){
        return new Promise(async function(resolve){
            try {
                let projectName = location.pathname.split('/')[1];
                SPLINT.config.meta = (await SPLINT_metaTagProvider.getConfigMeta(projectName))
            } catch {
                let projectName = location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2];
                SPLINT.config.meta = (await SPLINT_metaTagProvider.getConfigMeta(projectName))
            }
            resolve(SPLINT.config.meta);
            return SPLINT.config.meta;
        });
    }
}

