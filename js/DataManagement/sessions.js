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
    
  
    static PATH = location.protocol + "//" + location.host + "/Splint/php/DataManagement/sessions/sessionsAccess.php";
    // static MANAGER;
    static {
        this.MANAGER = new SPLINT.CallPHP.Manager(S_SessionsPHP.PATH);
    }
    constructor(){
    }

    static async set(name, value, js = true){
      let call = this.MANAGER.call(this.SET);
          call.data.value    = value;
          if(js){
            call.data.name   = "jsGen_" + name;
          } else {
            call.data.name   = name;
          }
          return call.send();
    }
    static async getSessionID(){
      let call = this.MANAGER.call("GET_SESSION_ID");
      return call.send();
    }
    static async get(name, js = true){
      let call = this.MANAGER.call(this.GET)
          if(js){
            call.data.name = "jsGen_" + name;
          } else {
            call.data.name = name;
          }
      return call.send();
    }
    static async remove(name, js = true){
      let call = this.MANAGER.call(this.REMOVE);
      if(js){
        call.data.name   = "jsGen_" + name;
      } else {
        call.data.name   = name;
      }
      return call.send();
    }
    static async getAllJS(){
        let call = this.MANAGER.call(this.GET_ALL_JS);
        return call.send();
    }
    static async getAll(){
        let call = this.MANAGER.call(this.GET_ALL);
        return call.send();
    }
    static async showAll(){
        return new Promise(async function(resolve){
            let s = await SPLINT.SessionsPHP.getAll()
            console.log(s);
            resolve(s);
            return s;
        });
    }
  }