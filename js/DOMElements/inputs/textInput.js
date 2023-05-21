class TextInputDiv {
    constructor(parent, name, value, autoHeight = true){
      this.parent = parent;
      this.name   = name;
      this.value  = value; 
      this.autoHeight = autoHeight;
      this.id     = parent.id + "_" + name + "_TextInput";
      this.div = new SPLINT.DOMElement(this.id + "_div", "div", this.parent);
      this.div.Class("TextInputDiv");
      this.oninput = function(){};
      this.draw();
    }
    get Value(){
      return this.textarea.value;
    }
    draw(){
      this.textarea  = new SPLINT.DOMElement(this.id + "_textarea", "textarea", this.div);
      this.textarea.placeholder = this.value;
      this.textarea.onclick = this.OnClick;
      this.label = new Label(this.div, this.textarea, this.value);
      this.label.before();
      this.divider = new SPLINT.DOMElement.HorizontalLine(this.div);
      this.divider.style.visibility = "hidden";
      this.textarea.oninput = function(e){
        this.#SwitchPlaceholder();
        this.oninput(e);
        if(this.autoHeight){
          this.adjustHeight();
        }
      }.bind(this);
    }
    setLabel(text){
      this.label = new Label(this.div, this.input, text);
      this.label.before();
      return this.label;
    }
    OnClick = function(e){};
    get isChecked(){
      return this.input.checked;
    }
    setValue(value){
      if(value != undefined){
        this.textarea.value = value;
        this.#SwitchPlaceholder();
        if(this.autoHeight){
          this.adjustHeight();
        }
      }
    }
    #SwitchPlaceholder() {
      if(this.textarea.value != ""){
          this.label.element.style.visibility = "visible";
          this.divider.style.visibility = "visible";
          this.textarea.classList.add("inputFilled");
          this.div.classList.add("inputFilled");
      } else {
          this.label.element.style.visibility = "hidden";
          this.divider.style.visibility = "hidden";
          this.textarea.classList.remove("inputFilled");
          this.div.classList.remove("inputFilled");
      }
    }
    adjustHeight() {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    }
  }