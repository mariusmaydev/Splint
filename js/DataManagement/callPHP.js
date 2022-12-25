
var asyncProgress = false;
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

  class FileUpload_S {
    static UPLOAD = "UPLOAD";

    constructor(path){
      this.path = path;
      this.data         = new FormData();
    }
    #call(){
      let data = new CallPHP_S.getCallObject(this.UPLOAD);
      return CallPHP_S.call(this.path, data);
    }
    static getFileData(srcElement){
      let element = $('#' + srcElement.id);
      if (typeof element.prop('files')[0] != 'undefined') {
        return element.prop('files')[0];
      } else {
        return false;
      }
    }
    direct(srcElement, type, onsuccess, args = null){
      let file_data = FileUpload_S.getFileData(srcElement);
      
      if(file_data != false){
            this.data.append("METHOD", type);
            this.data.append("file", file_data);
            this.data.append("Storage", args);
            this.onsuccess = onsuccess;
            this.upload();
        return true;
      }
      return false;
    }
    upload(){
      let ajaxData = new Object();
          ajaxData.url          = this.path;
          ajaxData.type         = "POST";
          ajaxData.contentType  = false;
          ajaxData.processData  = false;
          ajaxData.data         = this.data;
          ajaxData.async        = true;
          ajaxData.success      = function(data){
            console.log(this);
            this.onsuccess(data);
          }.bind(this);
      $.ajax(ajaxData);
    }
  }