class FileUpload_S {

    static PATH = PATH.php.upload;

    constructor(file_data, dst, form = null){
      this.file_data    = file_data;
      this.dst          = dst;
      if(form != null){
        this.data = form;
      } else {
        this.data         = new FormData();
      }
      this.data.append("METHOD", dst);
      this.data.append("file", file_data);
      this.onsuccess  = function(data){}; 
    }
    static getFileData(srcElement){
      let element = $('#' + srcElement.id);
      if (typeof element.prop('files') != 'undefined') {
        return element.prop('files');
      } else {
        return false;
      }
    }
    static direct(file_data, type, onsuccess, form = null){
      
      if(file_data != false){
        let fileUpload = new FileUpload_S(file_data, type, form);
            fileUpload.onsuccess = onsuccess;
            fileUpload.upload();
        return true;
      }
      return false;
    }
    static fromUnsplash(link, callBack){
      let data = SPLINT.CallPHP.getCallObject(FileUpload_S.UNSPLASH_IMG);
          data.link = link;
      SPLINT.CallPHP.call(FileUpload_S.PATH, data, "POST", false, callBack);
    }
    upload(){
      let ajaxData = new Object();
          ajaxData.url          = FileUpload_S.PATH;
          ajaxData.type         = "POST";
          ajaxData.contentType  = false;
          ajaxData.processData  = false;
          ajaxData.data         = this.data;
          ajaxData.async        = true;
          ajaxData.success      = function(data){
            this.onsuccess(data);
          }.bind(this);
      $.ajax(ajaxData);
    }
  }

// class FileUpload_S {
//     static UPLOAD = "UPLOAD";

//     constructor(path){
//       this.path = path;
//       this.data         = new FormData();
//     }
//     #call(){
//       let data = new CallPHP_S.getCallObject(this.UPLOAD);
//       return CallPHP_S.call(this.path, data);
//     }
//     static getFileData(srcElement){
//       let element = $('#' + srcElement.id);
//       if (typeof element.prop('files')[0] != 'undefined') {
//         return element.prop('files')[0];
//       } else {
//         return false;
//       }
//     }
//     direct(file_data, type, onsuccess){
      
//       if(file_data != false){
//         let fileUpload = this.upload(file_data, type);
//             fileUpload.onsuccess = onsuccess;
//             fileUpload.upload();
//         return true;
//       }
//       return false;
//     }
//     upload(file_data, type){
//       let ajaxData = new Object();
//           ajaxData.url          = this.path;
//           ajaxData.type         = "POST";
//           ajaxData.contentType  = false;
//           ajaxData.processData  = false;
//           ajaxData.data         = this.data;
//           ajaxData.async        = true;
//           ajaxData.success      = function(data){
//             console.log(this);
//             this.onsuccess(data);
//           }.bind(this);
//       $.ajax(ajaxData);
//     }
//   }