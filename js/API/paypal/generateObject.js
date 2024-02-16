
class S_PaypalObject {
    constructor(){

    }
    // set 
    
    static async preparePaypal(){
        let CouponObj = null;
        let Items = (await ShoppingCart.get()).shoppingCart;
        let FullPrice = 0;
        let productsData = await productHelper.getProducts();
        for(const item of Items){
            item.price = parseFloat(productsData[item.ProductName].price);
            FullPrice += S_Math.multiply(item.price, item.amount);
        }
        let orderObject = '{' +
        '"purchase_units": [{' +
            '"amount": {' +
            '"currency_code": "EUR",' +
            '"value": "' + FullPrice + '",' +
            '"breakdown": {' +
                '"item_total": {' +
                '"currency_code": "EUR",' +
                '"value": "' + FullPrice + '"' +
                '}' +
            '}' +
            '},' +
            '"items": [';

        for(let i = 0; i < Items.length; i++){
        orderObject +=
        '{' +
            '"name": "' + Items[i].ProductName + '",';
        if(CouponObj != null){
            orderObject +=   '"description": "CouponCode:' + CouponObj.code + '  Wert: ' + CouponObj.value + '  Für alle Produkte: ' + CouponObj.eachItem + '",';
        } else {
            orderObject +=   '"description": "",';
        }
        orderObject +=
            '"unit_amount": {' +
            '"currency_code": "EUR",' +
            '"value": "' + Items[i].price + '"' +
            '},' +
            '"quantity": "' + Items[i].amount + '"' +
        '}';
        if(i < Items.length - 1){
            orderObject += ',';
        }
        }

        orderObject += ']}],';
        orderObject += '"payment_source": {' + 
            '"paypal": {' + 
              '"experience_context": {'+
                '"payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",'+
                '"brand_name": "EXAMPLE INC",'+
                '"locale": "en-US",'+
                '"landing_page": "LOGIN",'+
                '"user_action": "PAY_NOW",'+
                '"return_url": "https://example.com/returnUrl",'+
                '"cancel_url": "https://example.com/cancelUrl"'+
              '}'+
            '}'+
          '}}';
        orderObject = JSON.parse(orderObject);
        orderObject.applicationContext = new Object();
        orderObject.applicationContext.shipping_preference = "SET_PROVIDED_ADDRESS";
        return orderObject;
    }
}