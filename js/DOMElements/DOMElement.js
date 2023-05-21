

class DOMElement_manager {
    static bind2class(baseID, instance, nameIsClass = false){
        instance.DOMElement_manager = new SPLINT.DOMElement_manager(baseID, instance);
        instance.DOMElement_manager.nameIsClass = nameIsClass;
    }
    constructor(baseID, instance = null){
        this.baseID = baseID;
        this.instance = instance;
        this.nameIsClass = false;
        if(this.instance != null){
            this.instance.getElement = function(name, type, parent = null){
                return this.getElement(name, type, parent);
            }.bind(this);
        }
    }
    setBaseID(id){
      this.baseID = id;
      // if(this.instance != null){
      //   this.instance.baseID()
      // }

    }
    getElement(name, type, parent = null){
        if(typeof type == 'object'){
          parent = type;
          type = "div";
        }
        let element = new SPLINT.DOMElement(this.baseID + name, type, parent);
        if(this.nameIsClass){
          element.Class(name);
        }
        return element;
    }
}




  class DOMElement {
    static get Manager(){
      return DOMElement_manager;
    }
    /**
     * @param id      : ElementID | null = uniqeID | "/UID( {empty or 1 - 10} )/" = uniqeID
     * @param tag     : HTMLtag | null = div
     * @param parent  : parentElement | parentID | null = get element if exist {element/ false}
     */
    constructor(id, tag, parent, oncreate = function(){}){
      this.oncreate = oncreate;
      this.#getID(id);
      this.#getTag(tag);
      this.#createElement();
      if(parent != undefined){
        if(document.getElementById(parent) == null){
          this.parent = parent;
        } else {
          this.parent = document.getElementById(parent);
        }
        this.parent.append(this.element);
      }
      return this.element;
    }
    #getID(id){
      if(id == undefined){
        this.id   = "UID_" + this.#uniqueID();
      } else if(id == null){
        this.id = null;
      } else {
        if(id.includes("/UID(")){
          if(!isNaN(id[id.indexOf("/UID(") + 5])){
            this.id = id.replace("/UID(", "_" + this.#uniqueID(id[id.indexOf("/UID(") + 5]));
            this.id = this.id.replace(")/", "");
          } else {
            this.id = id.replace("/UID()/", this.#uniqueID());
          }
        } else {
          this.id = id;
        }
      }
    }
    #getTag(tag){
      if(tag == undefined){
        this.tag  = "div";
      } else {
        this.tag  = tag;
      }
    }

    #createElement(){
      if(this.id != null && document.getElementById(this.id) != null && document.getElementById(this.id).tagName == this.tag.toUpperCase()){
        this.element = document.getElementById(this.id);
      } else {
        this.oncreate();
        this.element = document.createElement(this.tag);
        if(this.id != null){
          this.element.id = this.id;
        }
      }
    }
    #uniqueID(count = 10) {
      return Math.floor(Math.random() * Date.now()).toString().slice(0, count - 1);
    }
    static get SVG(){
      return S_SVGElement;
    }
    static get Button(){
      return S_Button;
    }
    static get SpanDiv(){
      return SpanDiv;
    }
    static get HorizontalLine(){
      return S_HorizontalLine;
    }
    static get Label(){
      return Label;
    }
    static get simple(){
      return SimpleElement;
    }
    static get InputDiv(){
      return n_InputDiv;
    }
    static get InputText(){
      return TextInputDiv;
    }
    static get InputAmount(){
      return AmountInput;
    }
    static get InputDropDown(){
      return DropDownInput_S;
    }
    static get InputDynamic(){
      return S_DynamicInput;
    }
    static get popupWindow(){
      return S_popupWindow;
    }
    static get Table(){
      return Table;
    }
    static get Nesting(){
      return S_Nesting;
    }
    static get ChartContainer(){
        return S_ChartContainer;
    }
  }
//   customElements.define('dom-elementr', DOMElement);

  class SimpleElement {
    constructor(parent, value = " ", name = null){
      value = value.replace(" ", "\xa0");
      if(name == null){
        name = 0;
        while(document.getElementById(parent.id + "_" + name + "_simple" + "_div") != null){
          name++;
        }
      }
      let main = new spanDiv(parent, name + "_simple", value);
      return main;
    }
  }