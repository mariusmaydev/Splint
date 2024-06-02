SPLINT.require_now('@SPLINT_ROOT/DataManagement/callPHP/CallPHP.js');

class S_SessionsPHP {
    static GET            = "GET_DATA";
    static GET_ALL        = "GET_ALL";
    static GET_ALL_JS     = "GET_ALL_JS";
    static SET            = "SET_DATA";
    static REMOVE         = "REMOVE_DATA";
    static USER_ID        = "USER_ID";
    static GUEST          = "GUEST";
    static PROJECT_NAME   = "PROJECT_NAME";
    static PROJECT_ID     = "PROJECT_ID";
    static CONVERTER_MODE = "CONVERTER_MODE";
      static MODE_EDIT_PROJECT  = "EDIT_PROJECT";
      static MODE_EDIT_CART     = "EDIT_CART";
      static #STORAGE = new Object();
      static #promiseGet = null;
    
  
    static PATH = location.protocol + "//" + location.host + "/Splint/php/DataManagement/sessions/sessionsAccess.php";
    // static MANAGER;
    static {
        this.MANAGER = new SPLINT.CallPHP.Manager(S_SessionsPHP.PATH);
    }
    constructor(){
    }

    static async set(name, value, js = true){
        if(js){
          name   = "jsGen_" + name;
        } else {
          name   = name;
        }
        this.#STORAGE[name] = value;
      let call = this.MANAGER.call(this.SET);
          call.data.value    = value;
            call.data.name   = name;
          return call.send();
    }
    static async getSessionID(){
      let call = this.MANAGER.call("GET_SESSION_ID");
      return call.send();
    }
    static async get(name, js = true, reload = false){
        if(js){
            name = "jsGen_" + name;
        }
        if(this.#STORAGE[name] != undefined && !reload){
            return this.#STORAGE[name];
        } else {
            let all =  this.getAll(true);
            return all[name];
        }
        
        // return all[name];
        // if(this.#STORAGE != null && !reload && this.#STORAGE[name] != undefined){
        //     return this.#STORAGE[name];
        // } else {
        //     let call = this.MANAGER.call(this.GET_ALL)
        //         call.data.name = name;
        //         if(this.#promiseGet == null){
        //             this.#promiseGet = call.send();
        //         }
        //         let res = await this.#promiseGet//await call.send();
        //         this.#STORAGE = res;
        //         this.#promiseGet = null;
        //         return res[name];

        // }
    //       if(js){
    //         call.data.name = "jsGen_" + name;
    //       } else {
    //         call.data.name = name;
    //       }
    //   return call.send();
    }
    static async remove(name, js = true){
        if(js){
          name   = "jsGen_" + name;
        } else {
          name   = name;
        }
        this.#STORAGE[name] = undefined;
      let call = this.MANAGER.call(this.REMOVE);
        call.data.name   = name;
      return call.send();
    }
    static async getAllJS(reload = false){
        let res = new Object();
        let all = await this.getAll(reload);
            for(const [key, val] of Object.entries(all)){
                if(key.includes("jsGen_")){
                    res[key] = val;
                }
            }
            return res;
    }
    static async getAll(reload = false){
        if(!reload){
            return this.#STORAGE;
        } else {
            let call = this.MANAGER.call(this.GET_ALL)
                if(this.#promiseGet == null){
                    this.#promiseGet = call.send();
                }
                let res = await this.#promiseGet//await call.send();
                this.#STORAGE = res;
                this.#promiseGet = null;
                return res;

        }
    }
    static async showAll(){
        return new Promise(async function(resolve){
            let s = await SPLINT.SessionsPHP.getAll(true)
            // let g = await SPLINT.SessionsPHP.getAllJS(true);
            console.log(s);
            resolve(s);
            return s;
        });
    }
  }