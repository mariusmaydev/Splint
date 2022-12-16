
class subWindow {
  constructor(name = "", showBackground = true){
    this.id = "subWindow_" + name + "_";
    this.showBackground = showBackground;
    this.element  = new DOMElement(this.id + "main", "div", document.body);
    this.element.Class("subWindow_MAIN");
    if(showBackground){
      this.background   = new DOMElement(this.id + "background", "div", this.element);
      this.background.Class("background");
      this.#events();
    }
    this.content      = new DOMElement(this.id + "content", "div", this.element);
    this.content.Class("content");
  }
  #events(){
    this.background.onclick = function(e){
      e.stopPropagation();
      this.element.remove();
    }.bind(this);
  }
  close(){
    this.element.remove();
  }
  Class(className){
    this.element.Class(className);
  }
  append(element){
    this.content.append(element);
  }
}