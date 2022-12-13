
  
  class DOMElement {
    /**
     * @param id      : ElementID | null = uniqeID | "/UID( {empty or 1 - 10} )/" = uniqeID
     * @param tag     : HTMLtag | null = div
     * @param parent  : parentElement | parentID | null = get element if exist {element/ false}
     */
    constructor(id, tag, parent, oncreate = function(){}){
      this.oncreate = oncreate;
      if(id == undefined){
        this.id   = "UID_" + this.uniqueID();
      } else {
        if(id.includes("/UID(")){
          if(!isNaN(id[id.indexOf("/UID(") + 5])){
            this.id = id.replace("/UID(", "_" + this.uniqueID(id[id.indexOf("/UID(") + 5]));
            this.id = this.id.replace(")/", "");
          } else {
            this.id = id.replace("/UID()/", this.uniqueID());
          }
        } else {
          this.id = id;
        }
      }
      if(tag == undefined){
        this.tag  = "div";
      } else {
        this.tag  = tag;
      }
      this.createElement();
      if(parent != undefined){
        if(document.getElementById(parent) == null){
          this.parent = parent;
        } else {
          this.parent = document.getElementById(parent);
        }
        this.parent.append(this.element);
      }
      this.#initPrototypes();
      return this.element;
    }

    createElement(){
      if(document.getElementById(this.id) != null && document.getElementById(this.id).tagName == this.tag.toUpperCase()){
        this.element = document.getElementById(this.id);
      } else {
        this.oncreate();
        this.element = document.createElement(this.tag);
        this.element.id = this.id;
      }
      // this.element.innerHTML = "";
    }

    uniqueID(count = 10) {
      return Math.floor(Math.random() * Date.now()).toString().slice(0, count - 1);
    }


    #initPrototypes(){
      HTMLElement.prototype.clear = function(element){
        for(let i = 0; i < this.childNodes.length; i++){
          if(this.childNodes[i] != element){
            this.childNodes[i].remove();
          }
        }
      }
      HTMLElement.prototype.disable = function(type){
        this.setAttribute(type, "");
      }
    }
  }