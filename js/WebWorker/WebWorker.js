
class S_WebWorker {
    /**
     * @param {string} workerSRC class, function or URL 
     */
    constructor(workerSRC, initDirect = true, singeUse = true){
        this.resolveCall    = null;
        this.workerSRC      = workerSRC;
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
    async init(){
        if(this.initComplete){
            return;
        }
        this.initComplete = true;
        this.url = await S_WebWorkerManager.getWorker(this.workerSRC)

        this.worker = new Worker(this.url, this.options);
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
        return;
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
    static get Manager(){
        return S_WebWorkerManager;
    }
}

//Example
class t12 {
    static {
        // onmessage = this.doStuff;
    }
    static async doStuff(){
            function f1() {
                setTimeout(async function(){
                    self.postMessage("ok");
                    f1();
                }, 4000)
            }
            f1();
    }
}