
class S_WebWorkerManager {
    static {
        this.STORAGE = new Object();
    }
    /**
     * @param {any} workerSRC class, function, URL 
     * @param {any} name 
     */
    constructor(workerSRC , name = ""){
        this.STACK      = [];
        this.workerSRC  = workerSRC;
        this.name       = name;
        this.options    = {};
    }
    onInitWorker(S_worker){
        this.STACK.push(S_worker);
    }
    onTerminateWorker(S_worker){
        let res = this.getWorkerByID(S_worker.id);
        if(res != null){
            this.STACK.splice(res.index);
        }
    }
    getWorkerByName(name){
        for(let i = 0; i < this.STACK.length; i++) {
            if( this.STACK[i].name == name ){
                return { S_worker: this.STACK[i], index: i };
            }
        }
        return null;
    }
    getWorkerByID(id){
        for(let i = 0; i < this.STACK.length; i++) {
            if( this.STACK[i].id == id ){
                return { S_worker: this.STACK[i], index: i };
            }
        }
        return null;
    }
    async connect(name = null, initDirect = true, singleUse = true){
        let w = this.getWorkerByName(name)
        if(w != null && w.S_worker.name == name){
            return w.S_worker;
        }
        let S_worker = new S_WebWorker(this.workerSRC, false, singleUse);
            S_worker.options    = this.options;
            S_worker.options.name = name;
            S_worker.name       = name;
            S_worker.id         = this.STACK.length;
            S_worker.manager    = this;
            if(initDirect) {
                await S_worker.init();   
            } 
        return S_worker;
    }
    static #fileName(url){
        return url.split("/").at(-1);
    }
    static async getWorker(url_class_function){
        return new Promise(async function(resolve){
            let key = null;
            let funcArray = null;
            if(typeof url_class_function == "string"){
                //url
                key = this.#fileName(url_class_function)
                if(this.STORAGE[key] != undefined){
                    resolve(this.STORAGE[key]);
                }
                if(url_class_function.substring(0, 12) == "@SPLINT_ROOT"){
                    url_class_function = self.SPLINT.rootPath + url_class_function.substring(12);
                } else if(url_class_function.substring(0, 1) != "."){
                    url_class_function = self.SPLINT.projectRootPath + url_class_function;
                }
                await fetch(url_class_function).then(async function(res){
                    let text    = await res.text();
                    funcArray   = [await this.#bindBase(text)];
                    return funcArray;
                }.bind(this))
            } else if(url_class_function.prototype != undefined){
                //class

                key = url_class_function.name;
                funcArray = ['(', await this.#bindBase(url_class_function.toString()), ')' ];
            } else {
                //function

                funcArray = ['(', await this.#bindBase(url_class_function.toString()), ')()' ]
            }
            let res = URL.createObjectURL(new Blob(funcArray, {type: "application/javascript"}));
            this.STORAGE[key] = res;
            resolve(this.STORAGE[key]);
        }.bind(this));
    }
    static async #bindBase(text){
            let ob = Object.assign({}, window.SPLINT);
            delete ob.threeJS;
            delete ob.isWorker;
                ob.referrer = document.URL;
            let ob1 = JSON.stringify(ob);
        
        let loadFunc = function(){
            // console.log(data1)
            for(const e of Object.entries(arguments[0])){
                SPLINT[e[0]] = e[1];
            }
            // for(const [key, value] of Object.entries(Object.getOwnPropertyDescriptors(SPLINT))){
            //     if(value.get != undefined){
            //         Object.defineProperty(SPLINT.WorkerAccess, key, value)
            //     }
            // }
            // console.dir(SPLINT)
        };
        let res = await fetch(location.origin + "/Splint/js/vanillaExtensions/StringExtensions.js");
        let Extensions = await res.text();
        let funcArray1 = '(' + loadFunc.toString() + ".bind(null, " + ob1 + ")" + ')()';
        // new Blob(["(", SPLINT_loaderHelper.toString(), ")"]
        return self.SPLINT.toString() + 
        Extensions +
        // SPLINT_Loader.toString()+ "\n" + 
        self.SPLINT.Worker.WorkerHelper.toString() + "\n" + funcArray1 + "\n" + text;
    }
}