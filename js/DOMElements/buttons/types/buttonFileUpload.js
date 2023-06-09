

class FileUploadButton_S extends S_Button {
    constructor(parent, name, accept, type, path2php){
      super(parent, name);
      this.parent = parent;
      this.name   = name;
      this.accept = accept;
      this.type   = type;
      this.path2php   = path2php;
      this.onsuccess = function(data){};
      this.id     = "ImageUpload_" + name;
      this.#draw();
    }
    preventDirect(){
      this.#draw(true);
    }
    get FileData(){
      return this.file_data;
    }
    #draw(preventDirect = false){
      this.input = new SPLINT.DOMElement(this.id + "_input", "input", this.parent);
      this.input.type = "file";
      this.input.accept = this.accept;
      this.input.name = "inputfile";
      this.input.oninput = function(){
            let fileupload = new FileUpload_S(this.path2php);
            if(preventDirect){
              this.file_data = FileUpload_S.getFileData(this.input);
            } else {
              fileupload.direct(this.input, this.type, this.onsuccess);
            }
            // UploadDirect(this.input);
            this.input.clear();
          }.bind(this);
    
      this.button.onclick = function(){
            this.input.click();
          }.bind(this);
    }
  }