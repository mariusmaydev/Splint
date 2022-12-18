
class PHP_sessions_S {
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
    constructor(){
  
    }
    static set(name, value, js = true){
      let data = CallPHP_S.getCallObject(PHP_sessions_S.SET);
          data.value  = value;
          if(js){
            data.name   = "jsGen_" + name;
          } else {
            data.name   = name;
          }
          CallPHP_S.call(PHP_sessions_S.PATH, data);
    }
    static get(name, js = true){
      let data = CallPHP_S.getCallObject(PHP_sessions_S.GET);
          if(js){
            data.name = "jsGen_" + name;
          } else {
            data.name = name;
          }
      return CallPHP_S.call(PHP_sessions_S.PATH, data).toObject(true);
    }
    static remove(name, js = true){
      let data = CallPHP_S.getCallObject(PHP_sessions_S.REMOVE);
      if(js){
        data.name   = "jsGen_" + name;
      } else {
        data.name   = name;
      }
      CallPHP_S.call(PHP_sessions_S.PATH, data);
    }
    static getAllJS(){
      let data = CallPHP_S.getCallObject(PHP_sessions_S.GET_ALL_JS);
      return CallPHP_S.call(PHP_sessions_S.PATH, data).toObject(true);
    }
    static getAll(){
      let data = CallPHP_S.getCallObject(PHP_sessions_S.GET_ALL);
      return CallPHP_S.call(PHP_sessions_S.PATH, data).toObject(true);
    }
    static showAll(){
      console.log(PHP_sessions_S.getAll());
    }
    static isset(name){
  
    }
  }