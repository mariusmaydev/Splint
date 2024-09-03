

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

class SPLINT_EventExtensions {
    static FULLSTACK = [];
    #instance = null; 
    constructor(instance){
        this.#instance = instance;
        this.stack = [];
    }
    addListener(type, callback, options, prevent = false){
        let url = new URL(location.href);
        let el = new Object();
            el.type = type
            el.options = options
            el.Page = url.searchParams.get("PAGE");
            if(el.Page == null){
                el.Page = "index";
            }
            el.prevent = prevent;
            el.instance = this.#instance;
            el.id = Math.random().toString(16).slice(2);;
            el.remove =  function(){
                this.removeListener(el.id);
            }.bind(this)

        el.callback = function(el, ev){
            callback(ev, el);
        }.bind(this, el);

        this.#instance.addEventListener(type, el.callback, options);

        this.stack.push(el)
        SPLINT_EventExtensions.FULLSTACK.push(el);
        return el;
    }   
    removeListener(id){
        this.stack.forEach(function(e, index, obj){
            if(e.id === id){
                this.#instance.removeEventListener(e.type, e.callback, e.options);
                obj.splice(index, 1);
            }
        }.bind(this));
        return false;
    }
    removeAllListeners(pageName = null){
        for(const e of this.stack){
            if(e.prevent) {
                continue;
            }
            if(pageName != null){
                if(e.Page == pageName){
                    e.remove();
                    this.#instance.removeEventListener(e.type, e.callback, e.options);
                    let index1 = SPLINT_EventExtensions.FULLSTACK.indexOf(e);
                    if (index1 !== -1) {
                        SPLINT_EventExtensions.FULLSTACK.splice(index1, 1);
                    }
                }
            } else {
                e.remove();
                this.#instance.removeEventListener(e.type, e.callback, e.options);
                let index1 = SPLINT_EventExtensions.FULLSTACK.indexOf(e);
                if (index1 !== -1) {
                    SPLINT_EventExtensions.FULLSTACK.splice(index1, 1);
                }
            }
        }
        this.stack = [];
    }
    static removeAllListenersFromOtherPage(){
        let url = new URL(location.href);
        let PageName = url.searchParams.get("PAGE");
        if(PageName == null){
            PageName = "index";
        }
        SPLINT_EventExtensions.FULLSTACK.forEach(function(el){
            if(el.prevent) {
                return;
            }
            if(el.Page != PageName){
                el.remove();
                let index1 = SPLINT_EventExtensions.FULLSTACK.indexOf(el);
                if (index1 !== -1) {
                    SPLINT_EventExtensions.FULLSTACK.splice(index1, 1);
                }
            }
        });
    }
    static removeAllListeners(pageName = null){
        SPLINT_EventExtensions.FULLSTACK.forEach(function(el){
            if(el.prevent) {
                return;
            }
            if(pageName != null){
                if(el.Page == pageName){
                    el.remove();
                    let index1 = SPLINT_EventExtensions.FULLSTACK.indexOf(el);
                    if (index1 !== -1) {
                        SPLINT_EventExtensions.FULLSTACK.splice(index1, 1);
                    }
                }
            } else {
                el.remove();
                let index1 = SPLINT_EventExtensions.FULLSTACK.indexOf(el);
                if (index1 !== -1) {
                    SPLINT_EventExtensions.FULLSTACK.splice(index1, 1);
                }
            }
        });
    }
}

    Object.defineProperty(EventTarget.prototype, "SEvent", {
        get: function(){
            if(this.SPLINT_STORAGE == undefined || this.SPLINT_STORAGE == null){
                this.SPLINT_STORAGE = new SPLINT_EventExtensions(this);
            }
            return this.SPLINT_STORAGE;
        },
        enumerable: false,
        configurable: true
    })
