
class ShoppingCart_S {
    static addItem(variantID, amount, Itemprice, productID){
        let cart = this.get();
        
        for(const index in cart.items){
            if(cart.items[index].variantID == variantID){
                cart.items[index].amount += amount;
                Cookie.set("ds_cart", JSON.stringify(cart));
                return;
            }
        }
        let obj = new Object();
            obj.variantID   = variantID;
            obj.amount      = amount;
            obj.price       = Itemprice;
            obj.productID   = productID;
            cart.items.push(obj);
        Cookie.set("ds_cart", JSON.stringify(cart));
    }
    static changeAmount(variantID, amount){
        let cart = this.get();
        
        for(const index in cart.items){
            if(cart.items[index].variantID == variantID){
                cart.items[index].amount = amount;
                Cookie.set("ds_cart", JSON.stringify(cart));
                return;
            }
        }
    }
    static removeItem(variantID){
        let cart = this.get();
        for(const index in cart.items){
            if(cart.items[index].variantID == variantID){
                cart.items.splice(index)
                Cookie.set("ds_cart", JSON.stringify(cart));
                return;
            }
        }

    }
    static get(){
        let cookies = Cookie.get();
        console.log(cookies);
        if(cookies.ds_cart != undefined){
            return cookies.ds_cart;
        } else {
            let cart = new Object();
                cart.items = [];
            Cookie.set("ds_cart", JSON.stringify(cart));
            return cart;
        }
    }

}