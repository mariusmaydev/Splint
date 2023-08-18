
SPLINT.require_now('@SPLINT_ROOT/DataManagement/callPHP/CallPHPManager.js');
class S_CallPHP {
    static #STACK = [];
    static #EXECUTING_STACK = true;
    static get Manager(){
        SPLINT.getClass("S_CallPHPManager", "CallPHPManager");
        return S_CallPHPManager;
    }
    static AccessSplint(key){
        return new S_CallPHP(SPLINT.PATHS.Access, key);
    }
    constructor(url = null, accessKey = null){
        this.url            = url;

        this.activeCall     = null;
        this.ACCESS_KEY     = accessKey;
        this.method         = "POST";
        this.mode           = "no-cors";
        this.cache          = "force-cache";
        this.processData    = true;
        this.credentials    = "same-origin";
        this.redirect       = "follow";
        this.referrerPolicy = "no-referrer";
        this.keepalive      = true;
        this.data           = new Object();
        this.controller     = new AbortController();
        this.headers        = new Object();
        // this.headers["Content-Type"] =  'application/json';
        // this.headers["X-Requested-With"] =  'XMLHttpRequest';
        // this.headers["accept"] = "application/json; charset=utf-8";
        // this.headers["content-encoding"] = "application/json; charset=utf-8";
        this.headers["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
        this.onBeforeSend   = function(){};
        this.onError        = function(){};
        this.onSuccess      = function(){};
        this.onFinish       = function(){};
        this.onAbort        = function(){};
        this.isPending      = false;
        this.callbackPromise = null;
        this.callbackPromiseTrigger = null;
    }
    abort(){
        this.controller.abort();
    }
    sendInSequence(preventMultipleRequests = false){
        if(preventMultipleRequests){
            if(!this.isPending){
                this.callbackPromise = new Promise(function(resolve){
                    this.callbackPromiseTrigger = resolve;
                }.bind(this));
                S_CallPHP.#STACK.push(this);
                S_CallPHP.#loopStack();
            }
        } else {
            this.callbackPromise = new Promise(function(resolve){
                this.callbackPromiseTrigger = resolve;
            }.bind(this));
            S_CallPHP.#STACK.push(this);
            S_CallPHP.#loopStack();
        }
        return this.callbackPromise;
    }
    async send(){
        if(this.isPending){
            return this.activeCall;
        }
        this.isPending = true;
        return this.sendRequest();
    }
    async sendRequest(){
        if(this.url == null){
            SPLINT.debugger.error("CallPHP", "no url provided");
            return;
        }
        this.url += "?" + SPLINT.PROJECT_NAME;
        this.headers["X-SPLINT-ACCESS_KEY"] =  this.ACCESS_KEY;

        let obj = new SPLINT.Types.autoObject();
            obj.method                  = this.method;
            // obj.mode                    = this.mode;
            obj.cache                   = this.cache;
            // obj.credentials             = this.credentials;
            obj.headers                 = this.headers;
            obj.keepalive               = this.keepalive;
            // obj.redirect                = this.redirect;
            // obj.referrerPolicy          = this.referrerPolicy;
            if(this.processData){
                obj.body                    = this.#serialize(this.data);  
                obj = obj.parseToObject(); 
            } else {
                obj = obj.parseToObject(); 
                obj.body = this.data;
            }
            obj.signal                  = this.controller.signal;
        this.onBeforeSend(obj);
            this.activeCall = fetch(this.url, obj)
            .then(function(r){
                return r.text();
            }.bind(this))
            .then(function(r){
                this.activeCall = null;
                this.isPending = false;
                let a =  S_JSON.parseIf(r);
                this.onFinish(a);
                this.onSuccess(a);
                return a;
            }.bind(this))
            .catch(function(e){
                this.isPending = false;
                this.onFinish(e);
                if(e.name == "AbortError"){
                    this.onAbort(e);
                } else {
                    this.onError(e);
                }
                return e;
            }.bind(this));
        return this.activeCall;
    }
    #parseData(){
        this.data = Object.entries(this.data);
        let newData = [];
        for (const property in this.data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(this.data[property]);
            newData.push(encodedKey + "=" + encodedValue);
        }
        return newData.join("&");
    }
    static call(uri, data){
        let call = new S_CallPHP(uri, key);
            call.#parseData.data = data;
        return call.send();
    }
    static async #loopStack(){
        if(S_CallPHP.#STACK.length == 0){
            S_CallPHP.#EXECUTING_STACK = true;
        }
        if(S_CallPHP.#STACK.length > 0 && S_CallPHP.#EXECUTING_STACK){
            S_CallPHP.#EXECUTING_STACK = false;
                let a = await S_CallPHP.#STACK[0].sendRequest();
                S_CallPHP.#STACK[0].callbackPromiseTrigger(a)
                S_CallPHP.#STACK.splice(0, 1);
                S_CallPHP.#EXECUTING_STACK = true;
                S_CallPHP.#loopStack();
        } 
    }
    #serialize(obj, prefix) {
        var str = [], p;
        for (p in obj) {
          if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
              v = obj[p];
              if(v == null || v == undefined){
                v = '';
              }
            str.push((v !== null && typeof v === "object") ?
                
                this.#serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
          }
        }
        return str.join("&");
      }
    
}

// class S_CallPHP_ENCODER {
//     constructor(){
//         this.levels = [];
//         this.actualKey = null;
//     }
//     static is(className, object) {
//         return Object.prototype.toString.call(object) === '[object '+ className +']';
//     }
//     encode(data) {
//         if (!S_CallPHP_ENCODER.is('Object', data) || !Object.keys(data).length) return null;
//         return this.__dataEncoding(data).slice(0, -1);
//     }
//     __dataEncoding(data){
//         let uriPart = '';
//         const levelsSize = this.levels.length;
//         if (levelsSize) {
//           uriPart = this.levels[0];
//           for(let c = 1; c < levelsSize; c++) {
//             uriPart += '[' + this.levels[c] + ']';
//           }
//         }
//         let finalString = '';
//         if (S_CallPHP_ENCODER.is('Object', data)) {
//             const keys = Object.keys(data);
//             const l = keys.length;
//             for(let a = 0; a < l; a++) {
//                 const key = keys[a];
//                 let value = data[key];
//                 this.actualKey = key;
//                 this.levels.push(this.actualKey);
//                 finalString += this.__dataEncoding(value);
//             }
//         } else if (S_CallPHP_ENCODER.is('Array', data)) {
//             if (!this.actualKey) throw new Error("Directly passed array does not work")
//             const aSize = data.length;
//             for (let b = 0; b < aSize; b++) {
//                 let aVal = data[b];
//                 this.levels.push(b);
//                 finalString += this.__dataEncoding(aVal);
//             }
//         } else {
//             finalString += uriPart + '=' + encodeURIComponent(data) + '&';
//         }
//         this.levels.pop();
//         return finalString;
//     }
// }

