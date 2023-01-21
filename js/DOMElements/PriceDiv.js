function priceDiv(parent, price, index = "", divider = function(price){ return price.toString().split(".");}){
    parent.setAttribute("ItemPrice", price);
    price = divider(price);
    if(price[1] == undefined){  
      price[1] = "00";
    }
    let main = new DOMElement("PriceDiv_Main_" + index + parent.id, "div", parent.id);
        let part1 = new DOMElement("PricePart1_" + index + parent.id, "span", main.id);
          part1.innerHTML = price[0];
        let part2 = new DOMElement("PricePart2_" + index + parent.id, "span", main.id);
          part2.innerHTML = price[1];
          part2.style.fontSize        = parseInt(window.getComputedStyle(main).fontSize.replace("px", "")) * 0.4 + "pt";
          part2.style.verticalAlign   = "text-top";
          part2.style.textDecoration  = "underline";
        let part3 = new DOMElement("PricePart3_" + index + parent.id, "span", main.id);
          part3.innerHTML = "&thinsp;€";
    
    this.main = main; 
  }

  class PriceDiv_S {
    constructor(parent, name, value){
      this.id     = name + "_PriceDiv_" + parent.id + "_";
      this.parent = parent;
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.parent.setAttribute("ItemPrice", value);
      this.mainElement.setAttribute("ItemPrice", value);
      this.price  = this.divider(value);
      this.draw();
    }
    divider(price){
      this.price = price.toString().split(".");
      return this.price;
    }
    draw(){
      if(this.price[1] == undefined){  
        this.price[1] = "00";
      }
      let part1 = new DOMElement(this.id + "part1", "span", this.mainElement);
          part1.innerHTML = this.price[0];

      let part2 = new DOMElement(this.id + "part2", "span", this.mainElement);
          part2.innerHTML = this.price[1];
          part2.style.fontSize        = parseInt(window.getComputedStyle(this.mainElement).fontSize.replace("px", "")) * 0.4 + "pt";
          part2.style.verticalAlign   = "text-top";
          part2.style.textDecoration  = "underline";

      let part3 = new DOMElement(this.id + "part3", "span", this.mainElement);
          part3.innerHTML = "&thinsp;€";
    }
  }