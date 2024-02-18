
class FileUploadButton_S extends SPLINT.DOMElement.Button {
    constructor(parent, name, accept, type, preventDirect = false){
      super(parent, name);
      this.parent = parent;
      this.preventDirect = preventDirect;
      this.name   = name;
      this.accept = accept;
      this.type   = type;
      this.onsuccess = function(data){};
      this.id     = "ImageUpload_" + name;
      this.file_data = null;
      this.#draw();
      this._onclick = function(e){};
    }
    preventDirect(){
      this.#draw(true);
    }
    get FileData(){
      return this.file_data;
    }
    #draw(preventDirect){
        this.input = new SPLINT.DOMElement(this.id + "_input", "input", this.parent);
        this.input.type = "file";
        this.input.accept = this.accept;
        this.input.name = "inputfile";
        this.input.multiple = true;
        this.input.oninput = function(){
            this.file_data = SPLINT.FileUpload.getFileData(this.input);
            if(!this.preventDirect){
                for (const file of this.file_data) {
                    SPLINT.FileUpload.direct(file, this.type, this.onsuccess);
                }
                this.input.value = "";
            }
        }.bind(this);
    
      this.button.onclick = function(e){
            this._onclick(e)  
            this.input.click();
        }.bind(this);
    }
    getFileForm(){
        if(this.file_data == null){
            return false;
        }
        let data         = new FormData();
            data.append("METHOD", this.type);
            // for (const file of this.file_data) {
                data.append("file", this.file_data);
            // }
        return data;
    }
}