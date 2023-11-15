class AmountInput {
    constructor(parent, name, amount = 1, arg = "test"){
      this.parent = parent;
      this.name = name;
      this.arg = arg;
      this.min = 1;
      this.amount = amount;
      this.id = "AmountInput_" + name + "_" + parent.id + "_";
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
      this.mainElement.Class("AmountDiv");
      this.oninput = function(){};
      this.draw();
    }
    draw(){
      let button_sub = new SPLINT.DOMElement.Button(this.mainElement, "sub");
          button_sub.bindIcon("remove");
          button_sub.onclick = function(){
            if(parseInt(this.amountInput.value.replace(this.arg, "")) > this.min){
              this.amount = parseInt(this.amountInput.value.replace(this.arg, "")) - 1;
              this.amountInput.value = this.amount + this.arg;
            }
            this.oninput(this.amount);
          }.bind(this);
  
      this.amountDiv = new SPLINT.DOMElement(this.id + "inputDiv", "div", this.mainElement);
          this.amountInput = new SPLINT.DOMElement(this.id + "input", "input", this.amountDiv);
          this.amountInput.value = this.amount + this.arg;
          this.amountInput.oninput = function(){
            this.amount = parseInt(this.amountInput.value.replace(this.arg, ""));
            this.oninput(this.amount);
          }.bind(this);
  
  
      let button_add = new SPLINT.DOMElement.Button(this.mainElement, "add");
          button_add.bindIcon("add");
          button_add.onclick = function(){
            this.amount = parseInt(this.amountInput.value.replace(this.arg, "")) + 1;
            this.amountInput.value = this.amount + this.arg;
            this.oninput(this.amount);
          }.bind(this);
    }
  }