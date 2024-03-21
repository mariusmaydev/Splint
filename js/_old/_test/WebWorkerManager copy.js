
class S_WebWorkerManager {
    static {
        this.BLOB_STORAGE = new Object();
    }
    static getFromBlobStorage(url){
        return this.BLOB_STORAGE[url];
    }
    constructor(func_or_class_or_BLOB_or_URL, name = ""){
        this.name           = name;
        this.STACK          = [];
        this.name           = name;
        this.options        = {};
        this.isFromBlob     = true;
        this.URL_or_BLOB    = null;
        this.loadingPromise = null;
        if(typeof func_or_class_or_BLOB_or_URL == "string"){
            this.URL_or_BLOB = func_or_class_or_BLOB_or_URL;
            let fromStorage = S_WebWorkerManager.getFromBlobStorage(this.URL_or_BLOB);
                if(fromStorage != undefined) {
                    this.blob = fromStorage;
                    this.URL = URL.createObjectURL(this.blob);
                } else {
                    this.loadingPromise = this.loadBLOBfromURL(this.URL_or_BLOB);
                    this.isFromBlob = false;
                }
        } else if(func_or_class_or_BLOB_or_URL instanceof Blob) {
            this.URL_or_BLOB = func_or_class_or_BLOB_or_URL;
            this.blob = func_or_class_or_BLOB_or_URL;
            this.URL = URL.createObjectURL(func_or_class_or_BLOB_or_URL);
            this.isFromBlob = true;
        } else {
            this.isFromBlob = true;
            let funcArray = null;
            if(func_or_class_or_BLOB_or_URL.prototype != undefined){
                funcArray = ['(', func_or_class_or_BLOB_or_URL.toString(), ')' ];
            } else {
                funcArray = ['(', func_or_class_or_BLOB_or_URL.toString(), ')()' ]
            }
            this.URL_or_BLOB = new Blob(funcArray, { type: 'application/javascript' } ) 
        }
        if(this.isFromBlob){
            this.URL = URL.createObjectURL(this.URL_or_BLOB);
        }
    }
    async loadBLOBfromURL(url){
        return fetch(url).then(async function(res) {
            this.blob = await res.blob();
            return this.blob;
        }.bind(this)).then(async function(blob){
            this.URL = URL.createObjectURL(blob);
            S_WebWorkerManager.BLOB_STORAGE[url] = this.blob;
            this.isFromBlob = true;
            return this.URL
        }.bind(this));
    }
    onInitWorker(S_worker){
        this.STACK.push(S_worker);
    }
    onTerminateWorker(S_worker){
        let res = this.getWorker(S_worker.name);
        if(res != null){
            this.STACK.splice(res.index);
        }
    }
    getWorker(name){
        for(let i = 0; i < this.STACK; i++) {
            if( this.Stack[i].name == name ){
                return { S_worker: this.STACK[i], index: i };
            }
        }
        return null;
    }
    connect(initDirect = true, singleUse = true){
        let S_worker
            if(this.blob instanceof Blob){
                S_worker = new S_WebWorker(this.blob, false, singleUse);
            } else if(this.loadingPromise == null){
                S_worker = new S_WebWorker(this.URL, false, singleUse);
            } else {
                S_worker = new S_WebWorker(this.URL_or_BLOB, false, singleUse);
            }
            S_worker.options  = this.options;
            S_worker.name     = this.STACK.length;
            S_worker.manager  = this;
            if(initDirect) {
                S_worker.init();   
            } 
        return S_worker;
    }

}