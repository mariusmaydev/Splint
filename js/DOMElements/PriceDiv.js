function priceDiv(parent, price, index = "", divider = function(price){ return price.toString().split(".");}){
    parent.setAttribute("ItemPrice", price);
    price = divider(price);
    if(price[1] == undefined){  
      price[1] = "00";
    }
    let main = new SPLINT.DOMElement("PriceDiv_Main_" + index + parent.id, "div", parent.id);
        let part1 = new SPLINT.DOMElement("PricePart1_" + index + parent.id, "span", main.id);
            part1.innerHTML = price[0];
        let part2 = new SPLINT.DOMElement("PricePart2_" + index + parent.id, "span", main.id);
            part2.innerHTML = price[1];
            part2.style.fontSize        = parseInt(window.getComputedStyle(main).fontSize.replace("px", "")) * 0.4 + "pt";
            window.addEventListener("resize", function(){
              part2.style.fontSize        = parseInt(window.getComputedStyle(main).fontSize.replace("px", "")) * 0.4 + "pt";
            });
            part2.style.verticalAlign   = "text-top";
            part2.style.textDecoration  = "underline";
        let part3 = new SPLINT.DOMElement("PricePart3_" + index + parent.id, "span", main.id);
            part3.innerHTML = "&thinsp;€";
    
    this.main = main; 
  }

  class PriceDiv_S {
    constructor(parent, name, value){
      this.id     = name + "_PriceDiv_" + parent.id + "_";
      this.name = name;
      this.parent = parent;
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("PriceDiv");
      this.parent.setAttribute("ItemPrice", value);
      this.mainElement.setAttribute("ItemPrice", value);
      this.mainElement.setAttribute("name", "priceDiv_S_" + this.name);
      this.price  = this.divider(value);
      this.draw();
    }
    setPrice(value){
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
      let part1 = new SPLINT.DOMElement(this.id + "part1", "span", this.mainElement);
          part1.innerHTML = this.price[0];

      let part2 = new SPLINT.DOMElement(this.id + "part2", "span", this.mainElement);
          part2.innerHTML = this.price[1];
          part2.style.fontSize        = parseInt(window.getComputedStyle(this.mainElement).fontSize.replace("px", "")) * 0.4 + "pt";
          window.addEventListener("resize", function(){
            part2.style.fontSize        = parseInt(window.getComputedStyle(this.mainElement).fontSize.replace("px", "")) * 0.4 + "pt";
          }.bind(this));
          part2.style.verticalAlign   = "text-top";
          part2.style.textDecoration  = "underline";

      let part3 = new SPLINT.DOMElement(this.id + "part3", "span", this.mainElement);
          part3.innerHTML = "&thinsp;€";
    }
    static getByName(name){
      return document.getElementsByName("priceDiv_S_" + name)[0];
    }
    static setValue(name, value){
      let parent = PriceDiv_S.getByName(name).parentNode;
      let priceDivEle = new PriceDiv_S(parent, name, value);
    }
    set value(v){
      this.mainElement.setAttribute("ItemPrice", v);
      this.parent.setAttribute("ItemPrice", v);
      this.price = this.divider(v);
      this.draw();
    }
    get value(){
      return this.mainElement.getAttribute("ItemPrice");
    }
  }