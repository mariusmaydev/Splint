
  class CallPHP_S {
    constructor(path, method = null){
      this.path   = path;
      this.method = method;
    }
    call(data, type = "POST", sync = true, callBack = function(){}){
      if(this.method == null && data.METHOD == null){
        console.error("Call Methode fehlt");
        return;
      } 
      if(data.METHOD == null){
        data.METHOD = this.method;
        console.warn("Call Methode nicht neu definiert. Vordefinierte Methode verwendet: " + this.method);
      }
      return this.call(this.path, data, type, sync, callBack);
    }
    static getCallObject(method){
      let callObj = new Object();
          callObj.METHOD = method;
      return callObj;
    }
    static call(path, callObj, type = "POST", sync = true, callBack = function(){}){
      if(!sync){
        if(asyncProgress){
          return new obj(null);
        }
        asyncProgress = true;
      }
      let response = $.ajax({
          url     : path,
          type    : type,
          data    : callObj,
          async   : !sync,
          success: function(response){
            callBack(response);
          },
          complete: function(){
            asyncProgress = false;
          }
        }).responseText;
        function obj(response){
          this.toObject = function(flag = false){
            if(typeof response == "string"){
              try {
                if(flag){
                  return JSON.parse(response);
                } else {
                  return JSON.parse(response, function(k, v) { 
                    if(!isNaN(v) && typeof v != 'boolean'){
                      return parseInt(v, 10);
                    } 
                    return v;
                  });
                }
              } catch {
                return response;
              }
            }
          }
          this.text   = response;
      }  
      return new obj(response);
    }
  }