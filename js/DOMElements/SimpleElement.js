
class S_SimpleElement {
    constructor(parent, value = " ", name = null){
        this.parent = parent;
        this.value  = value.replace(" ", "\xa0");;
        this.name   = name;
        if(this.name == null){
          this.name = 0;
          while(document.getElementById(parent.id + "_" + this.name + "_simple" + "_div") != null){
            this.name++;
          }
        }
        return new SPLINT.DOMElement.SpanDiv(parent, name + "_simple", value);
    }
    static get(parent, value = " ", name = null){
        return new S_SimpleElement(parent, value, name);
    }
}

