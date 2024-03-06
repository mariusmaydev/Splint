
class S_popupWindow {
  constructor(name = "", showBackground = true, drawButtonClose = true){
    this.id = "subWindow_" + name + "_";
    this.showBackground = showBackground;
    this.element  = new SPLINT.DOMElement(this.id + "main", "div", document.body);
    this.element.Class("subWindow_MAIN");
    this.onclose = function(){};
    if(showBackground){
      this.background   = new SPLINT.DOMElement(this.id + "background", "div", this.element);
      this.background.Class("background");
      this.#events();
    }
    this.content      = new SPLINT.DOMElement(this.id + "content", "div", this.element);
    this.content.Class("content");
    if(drawButtonClose){
      this.drawButtonClose();
    }
    this.close = function(){
        this.onclose();
        this.element.remove();
    }.bind(this)
  }
  get Element(){
    return this.content;
  }
  #events(){
    this.background.onclick = function(e){
      e.stopPropagation();
      this.close();
    }.bind(this);
  }
  Class(...classNames){
    for(const ele of classNames) {
        this.element.Class(ele);
    }
  }
  append(element){
    this.content.append(element);
  }
  setZindex(val){
    this.background.style.zIndex = val;
  }
  drawButtonClose(){
    this.buttonClose = new S_Button(this.content, "close");
    this.buttonClose.bindIcon("close");
    this.buttonClose.button.Class("button_close");
    this.buttonClose.onclick = function(){
      this.close();
    }.bind(this);
  }
}