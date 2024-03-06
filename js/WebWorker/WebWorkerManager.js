
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
        if(w != null && w.name == name){
            return w.S_worker;
        }
        let S_worker = new S_WebWorker(this.workerSRC, false, singleUse);
            S_worker.options    = this.options;
            S_worker.name       = name;
            S_worker.id         = this.STACK.length;
            S_worker.manager    = this;
            if(initDirect) {
                S_worker.init();   
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
                if(url_class_function.substring(0, 1) != "."){
                    url_class_function = SPLINT.projectRootPath + url_class_function;
                }
                await fetch(url_class_function).then(async function(res){
                    let text    = await res.text();
                    funcArray   = [text];
                    return funcArray;
                }.bind(this))
            } else if(url_class_function.prototype != undefined){
                //class

                key = url_class_function.name;
                funcArray = ['(', url_class_function.toString(), ')' ];
            } else {
                //function

                funcArray = ['(', func_or_class.toString(), ')()' ]
            }
            let res = URL.createObjectURL(new Blob(funcArray, {type: "text/javascript"}));
            this.STORAGE[key] = res;
            resolve(this.STORAGE[key]);
        }.bind(this));
    }

}