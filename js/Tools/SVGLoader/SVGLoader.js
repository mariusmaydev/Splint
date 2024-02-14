
class SVG_Loader_S {
    constructor(){
      this.SVG = new Object();
    }
    load(name, path, color = null){
      this.SVG[name] = new SPLINT.SVG.Object(name, path, color);
    }
    get(name){
      return this.SVG[name];
    }
    remove(name){
      delete this.SVG[name];
    }
  }