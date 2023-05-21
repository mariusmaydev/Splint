
class JSBuilder {
    static PATH = SPLINT.PATHS.php.JSBuilder;
    static #call(data){
        return CallPHP_S.call(this.PATH, data);
    }
    static test(){
        let data = CallPHP_S.getCallObject("TEST");
            // data.path = "/settings.json";
            data.content = "content";

        return this.#call(data).toObject(true);
    }
    static edit(path, content = ""){
      let data = CallPHP_S.getCallObject("EDIT");
          data.path = path;
          data.content = content;
      return this.#call(data).toObject(true);
    }
    static get(path){
      let data = CallPHP_S.getCallObject("GET");
          data.path = path;
      return this.#call(data).toObject(true);
    }
}