
class S_PaypalFastCheckout {
    constructor(parent){
      this.id = "fastCheckout_";
      this.parent = parent;
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
      this.mainElement.Class("fastCheckout");
      S_API_Paypal.draw.Buttons.draw(this.mainElement);
    }

}