
class nS_Location {
    static {
        this.STORAGE = new Object();
        this.STORAGE.hashes = this.#queryHashes();
        this.STORAGE.params = this.getParams();
        this.href = window.location.href.split("?")[0].split("#")[0];
        window.addEventListener("hashchange", function(e){
            this.STORAGE.hashes = this.#queryHashes();
        }.bind(this))
        
    }
    static set URL(v){
        this.href = v.split("?")[0].split("#")[0];
    }
    static get URL(){
        return this.href.split("?")[0].split("#")[0];
    }
    static set hash(v){
        window.location.hash = v;
    }
    static get hashes() {
        return window.location.hash
    }
    static Direct(url){
        this.href = url;
        window.location.href = url;
    }
    static goBack(steps = -1){
        window.history.go(steps);
    }
    static #queryHashes(){
        let hashes = window.location.hash.split("#")
            hashes = SPLINT.SArray.removeValues(hashes, '');
        return hashes;
    }
    static addHash(...hashes){
        this.#queryHashes();
        this.STORAGE.hashes = SPLINT.SArray.combine(this.STORAGE.hashes, hashes);
        return this;
    }
    static setHashes(...hashes){
        this.STORAGE.hashes = hashes;
        return this;
    }
    static getHashes(){
        this.STORAGE.hashes = this.#queryHashes();
        return this.STORAGE.hashes;
    }
    static removeHash(...hash){
        let res = SPLINT.SArray.removeValues(window.location.hash.split("#"), [hash, ''].flat());
        window.location.hash = "#" + (res.join('#'));
    }
    /**
     * @description
     * adds or edits the given parameters to the url
     * @param  {...object | Array } params 
     * @example can handle the folowing input formats
     * - {"key": "value"}, {"key1": "value1"}...
     * - {"key": "value"}, ["key1", "value1"]...
     * - ["key", "value"], ["key1", "value1"]...
     * - {"key": "value", "key1": "value1"...}...
     * @returns this
     */  
    static addParams(...params){
        if(params.length == 1){
            params = Object.entries(...params)
        }
        for(const e of params){
            if(Array.isArray(e)){
                this.STORAGE.params[e[0]] = e[1];
            } else if(typeof e == 'object'){
                let o = Object.entries(e)[0];
                this.STORAGE.params[o[0]] = o[1];
            }
        }
        return this;
    }
    /**
     * @description
     * removes the given parameters from the url
     * @param  {...string} params 
     * @returns this
     */  
    static removeParams(...params){
        for(const e of params){
            delete this.STORAGE.params[e];
            // console.dir(this.STORAGE.params)
            // if(Array.isArray(e)){
            //     this.STORAGE.params[e[0]] = e[1];
            // } else if(typeof e == 'object'){
            //     let o = Object.entries(e)[0];
            //     console.log(o)
            //     this.STORAGE.params[o[0]] = o[1];
            // }
            // console.log(e,this.STORAGE.params[e])
            // let index = this.STORAGE.params[e];
            // if(index !== -1){
            //     this.STORAGE.params.splice(index, 1);
            // }
        }
        return this;
    }
    /**
     * @description
     * sets the given parameters to the url
     * @param  {...object | Array } params 
     * @example can handle the folowing input formats
     * - {"key": "value"}, {"key1": "value1"}...
     * - {"key": "value"}, ["key1", "value1"]...
     * - ["key", "value"], ["key1", "value1"]...
     * - {"key": "value", "key1": "value1"...}...
     * @returns this
     */  
    static setParams(...params){
        this.STORAGE.params = new Object();
        this.addParams(...params);
        return this;
    }
    /**
     * @description
     * - returns all paramters of the url as an Object.
     * - returns empty object if no parameter is set.
     * @returns {Object} Object of parameters
     * @example returns 
     * {"key":"value", "key1": "value1"...} 
     */
    static getParams(){
        let string = window.location.search;
            if(string == ""){
                return new Object();
            }
            string = string.replace("?", "").split('&');
            let response = new Object();
                for(const param of string){
                let array = param.split('=');
                    response[array[0]] = array[1];
                }
        return response;
    }
    static call(reload = true){
        // this.href = this.href.split("#")[0];
        this.href = this.URL;
        for(const e of Object.entries(this.STORAGE.params)){
            if(!this.href.includes("?")){
                this.href = this.href + "?";
            } else {
                if(!this.href.endsWith("&")){
                    this.href = this.href + "&";
                }
            }
            this.href = this.href + e[0] + "=" + e[1];
        }
        for(const e of this.STORAGE.hashes){
            this.href = this.href + "#" + e;
        }
        if(reload){
            window.location.href = this.href;
        } else {
            window.history.pushState(null, null, this.href);
        }
    }
    static callO(reload = true){
        console.dir(this);
        this.href = this.href.split("#")[0];
        for(const e of Object.entries(this.STORAGE.params)){
            console.dir(e)
            if(!this.href.includes("?")){
                this.href = this.href + "?";
            } else {
                if(!this.href.endsWith("&")){
                    this.href = this.href + "&";
                }
            }
            console.dir(this.href)
            debugger
            this.href = this.href + e[0] + "=" + e[1];
            console.dir(this.href)
            debugger
        }
        for(const e of this.STORAGE.hashes){
            this.href = this.href + "#" + e;
        }
        console.dir(this)
        debugger
        if(reload){
            window.location.href = this.href;
        } else {
            window.history.pushState(null, null, this.href);
        }
    }
    static load = class {
        static atProjectRoot(uri){
            if(uri.startsWith("/")){
                uri = uri.slice(1);
            }
            window.location.href = SPLINT.projectRootPath + uri;
        }
    }
    static URI = class {
        static fromProjectRoot(path){
            return SPLINT.projectRootPath + path;
        }
    }
}