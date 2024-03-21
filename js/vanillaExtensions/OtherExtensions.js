

Object.defineProperty(Function.prototype, "callFromIdle", {
    value: async function(timeout = 1000, boundValue = null){
            let callback = this;
            return await new Promise(async function(resolve){
                requestIdleCallback(async function(deadline){
                    if(deadline.timeRemaining() > 0 || deadline.didTimeout){
                        let r = await callback.call(boundValue);
                        resolve(r);
                    } else {
                        resolve(false);
                    }
                }.bind(this), {timeout : timeout});
            }.bind(this));
    }, 
    enumerable: false,
    configurable: true
})