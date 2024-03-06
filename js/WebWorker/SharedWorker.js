

class S_SharedWorker {
    /**
     * @param {string} URL The URL to the worker from ProjectRoot 
     */
    constructor(URL, initDirect = true){
        this.resolveCall    = null;
        this.URL            = URL;
        this.options        = null;
        this.initComplete   = false;
        this.onReceive      = function(){};
        this.onError        = function(){};
        this.onmessageerror = function(){};
        if(initDirect){
            this.init();
        }
    }
    init(){
        if(this.initComplete){
            return;
        }
        this.initComplete = true;
        if(!this.isFromBlob){
            this.URL = SPLINT.projectRootPath + this.URL;
        }
        this.worker = new SharedWorker(this.URL, this.options);
        console.dir(this.worker)
        this.worker.port.start();
        this.worker.port.onmessage = function(e) {
            if(this.resolveCall != null){
                this.resolveCall(e.data);
            }
            this.onReceive(e);
        }.bind(this);
        this.worker.port.onmessageerror = function(e){
            this.onmessageerror(e)
        }.bind(this)
        this.worker.port.onerror = function(e) {
            this.onError(e);
        }.bind(this);
    }
    send(method, ...message){
        message[0].method = method;
        this.worker.port.postMessage(...message);
    }
    terminate(){
        this.worker.port.terminate();
    }
    async sendInPromise(method, ...message){
        return new Promise(function(resolve){
            this.resolveCall = resolve;
            message[0].method = method;
            this.worker.port.postMessage(...message);
        }.bind(this));
    }
    // static get fromFunction(){
    //     return class {
    //         constructor(func_or_class, initDirect = true){
    //             let funcArray = null;
    //             if(func_or_class.prototype != undefined){
    //                 funcArray = ['(', func_or_class.toString(), ')' ];
    //             } else {
    //                 funcArray = ['(', func_or_class.toString(), ')()' ]
    //             }
    //             let blob =  new Blob(funcArray, { type: 'application/javascript' } ) 
    //             let inst = new S_WebWorker(URL.createObjectURL(blob), false);
    //                 inst.isFromBlob = true;
    //                 if(initDirect){
    //                     inst.init();
    //                 }
    //             return inst;
    //         }
    //     }
    // }
}

// let testW = new SPLINT.Worker.WebWorker.fromFunction(t12);
//     testW.onReceive = function(){
//         console.log(arguments);
//     }
//     // testW.init();
//     // setTimeout(function(){
//     //     testW.send("test", {a:"a"})
//     // }, 2000);
//     testW.sendInPromise("test", {a:"a"}).then(function(){
//         console.log(arguments);
//     });

// class S_SharedWorker {
//     /**
//      * @param {string} URL The URL to the worker from ProjectRoot 
//      */
//     constructor(URL, initDirect = true){
//         this.URL        = SPLINT.projectRootPath + URL;
//         this.options    = null;
//         this.onReceive  = function(){};
//         this.onError    = function(){};
//         if(initDirect){
//             this.init();
//         }
//     }
//     init(){
//         this.worker = new SharedWorker(this.URL, this.options);
//         this.worker.port.onmessage = function(e) {
//             this.onReceive(e);
//         }.bind(this);
//         this.worker.port.onerror = function(e) {
//             this.onError(e);
//         }.bind(this);
//     }
//     send(message){
//         this.worker.port.postMessage(message);
//     }
//     terminate(){
//         this.worker.port.terminate();
//     }
//     async sendInPromise(method, ...message){
//         return new Promise(function(resolve){
//             this.resolveCall = resolve;
//             message[0].method = method;
//             this.worker.postMessage(...message);
//         }.bind(this));
//     }
// }