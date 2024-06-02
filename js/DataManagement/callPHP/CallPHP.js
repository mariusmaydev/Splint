
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
        this.referrer       = SPLINT.referrer;
        this.activeCall     = null;
        this.ACCESS_KEY     = accessKey;
        this.method         = "POST";
        this.mode           = "cors";
        this.cache          = "force-cache";
        this.processData    = true;
        this.withCredentials = true;
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
        // this.headers["Access-Control-Allow-Origin"] = '*';
        // this.headers["Access-Control-Request-Headers"] = '*';
        // this.headers["Access-Control-Allow-Test"] = 'ABV';
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
    async send(disableProjectIDparam = null){
        if(disableProjectIDparam != null){
            debugger;
        }
        if(this.isPending){
            return this.activeCall;
        }
        this.isPending = true;
        return this.sendRequest(disableProjectIDparam);
    }
    async sendRequest(disableProjectIDparam = false){
        if(this.url == null){
            SPLINT.debugger.error("CallPHP", "no url provided");
            return;
        }
        if(!disableProjectIDparam){
            this.url += "?" + this.ACCESS_KEY;
        }
        this.headers["Splint-Access-Key"] =  (this.ACCESS_KEY);

        let obj = new SPLINT.Types.autoObject();
            obj.method                  = this.method;
            obj.referrer                = this.referrer;
            obj.mode                    = this.mode;
            obj.cache                   = this.cache;
            obj.credentials             = this.credentials;
            obj.headers                 = this.headers;
            obj.keepalive               = this.keepalive;
            // obj.redirect                = this.redirect;
            obj.withCredentials         = this.withCredentials;
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
                let a =  SPLINT.Tools.parse.toJSON(r);
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
