/**
 * @deprecated
 */
function spanDiv(parent, name, value){
    let div = new SPLINT.DOMElement(parent.id + "_" + name + "_div", "div", parent);
    // let div = new SPLINT.DOMElement(parent.id + "_" + name + "_div", "div", parent);
    let span = new SPLINT.DOMElement(parent.id + "_" + name + "_span", "span", div);
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
    static get(parent, name, value){
      return new SpanDiv(parent, name, value);
    }
    constructor(parent, name, value){
        this.id         = "SpanDiv_" + parent.id + "_" + name + "_";
        this.name       = name;
        this.parent     = parent;
        this._value     = value;
        this._hide      = false;
        this.div = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.span = new SPLINT.DOMElement(this.id + "span", "span", this.div);
        this.span.innerHTML = this._value;
    }
    set hide(flag){
        this._hide = flag;
        this.div.setAttribute("hidden", flag);
    }
    set identifier(v){
        this.div.setAttribute("name", v);
        this.span.setAttribute("name", v);
    }
    get identifier(){
        return this.div.name;
    }
    isHidden(){
        return this._hide;
    }
    Class(className){
      this.div.Class(className);
    }
    set value(v){
      this.span.innerHTML = v;
      this._value = v;
    }
    get value(){
      return this._value;
    }
}