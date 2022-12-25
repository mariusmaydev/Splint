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