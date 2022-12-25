function spanDiv(parent, name, value){
    let div = new DOMElement(parent.id + "_" + name + "_div", "div", parent.id);
    let span = new DOMElement(parent.id + "_" + name + "_span", "span", div.id);
        span.innerHTML = value;
    this.div  = div;
    this.span = span;
    this.value = function(value){
      span.innerHTML = value;
    }
    this.getValue = function(){
      return span.innerHTML;
    }
    this.setValue = function(value){
      span.innerHTML = value;
    }
    this.Class = function(Newclass){
      function obj(){
        this.set    = function(){
          div.className = Newclass;
          return;
        }
        this.add    = function(){
          div.classList.add(Newclass);
          return;
        }
        this.remove = function(){
          div.classList.remove(Newclass);
          return;
        }
      }
      return new obj();
    }
  }


class SpanDiv {
    constructor(parent, name, value){
        this.id     = "SpanDiv_" + parent.id + "_" + name + "_";
        this.name   = name;
        this.parent = parent;
        this.value  = value;
        this.div = new DOMElement(this.id + "main", "div", this.parent);
        this.span = new DOMElement(this.id + "span", "span", this.div);
        this.span.innerHTML = this.value;
    }
}