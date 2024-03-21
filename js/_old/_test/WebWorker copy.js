
class S_WebWorker {
    /**
     * @param {string} URL The URL to the worker from ProjectRoot 
     */
    
    constructor(func_or_class_or_BLOB_or_URL, initDirect = true, singeUse = true){
        let blob = null;
        if(typeof func_or_class_or_BLOB_or_URL == "string"){
            return new S_WebWorker.#hiddenConstructor(func_or_class_or_BLOB_or_URL, initDirect, singeUse);
        }
        if(func_or_class_or_BLOB_or_URL instanceof Blob) {
            blob = func_or_class_or_BLOB_or_URL;
        } else {
            let funcArray = null;
            if(func_or_class_or_BLOB_or_URL.prototype != undefined){
                funcArray = ['(', func_or_class_or_BLOB_or_URL.toString(), ')' ];
            } else {
                funcArray = ['(', func_or_class_or_BLOB_or_URL.toString(), ')()' ]
            }
            blob =  new Blob(funcArray, { type: 'application/javascript' } ) 
        }
        let inst = new S_WebWorker.#hiddenConstructor(URL.createObjectURL(blob), false, singeUse);
            inst.isFromBlob = true;
            if(initDirect){
                inst.init();
            }
        return inst;
    }
    static get #hiddenConstructor(){
        return class {
            constructor(URL_or_BLOB, initDirect = true, singeUse = true){
                this.resolveCall    = null;
                this.URL            = URL_or_BLOB;
                this.options        = null;
                this.initComplete   = false;
                this.onReceive      = function(){};
                this.onError        = function(){};
                this.manager        = null;
                this.name           = null;
                this.singeUse       = singeUse;
                if(initDirect){
                    this.init();
                }
            }
            init(){
                if(this.initComplete){
                    return;
                }
                this.initComplete = true;
                if(!this.isFromBlob && this.URL.substring(0, 1) != "."){
                    this.URL = SPLINT.projectRootPath + this.URL;
                }
                this.worker = new Worker(this.URL, this.options);
                this.worker.onmessage = function(e) {
                    if(this.resolveCall != null){
                        this.resolveCall(e.data);
                    }
                    this.onReceive(e);
                    if(this.singeUse){
                        this.terminate();
                    }
                }.bind(this);
                this.worker.onerror = function(e) {
                    this.onError(e);
                    if(this.singeUse){
                        this.terminate();
                    }
                }.bind(this);
                if(this.manager != null){
                    this.manager.onInitWorker(this);
                }
            }
            send(method, data, transferable = []){
                let message = new Object();
                    message.method  = method;
                    message.data    = data;
                this.worker.postMessage(message, transferable);
            }
            terminate(){
                if(this.manager != null){
                    this.manager.onTerminateWorker(this);
                }
                this.worker.terminate();
            }
            async sendInPromise(method, data, transferable = []){
                return new Promise(function(resolve){
                    this.resolveCall = resolve;
                    let message = new Object();
                        message.method  = method;
                        message.data    = data;
                    this.worker.postMessage(message, transferable);
                }.bind(this));
            }
        }
    }
    static get Manager(){
        return S_WebWorkerManager;
    }
}


//Example
// class t12 {
//     static {
//         onmessage = this.doStuff;
//     }
//     static async doStuff(){
//             function f1() {
//                 setTimeout(async function(){
//                     self.postMessage("ok");
//                     f1();
//                 }, 4000)
//             }
//             f1();
//     }
// }
