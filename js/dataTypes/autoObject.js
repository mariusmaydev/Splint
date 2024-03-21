
class S_ObjectFunctions {
    constructor(instance){
        // this.instance = instance;      
        Object.defineProperty(S_ObjectFunctions.prototype, "instance", {
            value: instance,
            writable: true,

            configurable : true,
            enumerable: false,
        })
        // this.toMap = this.toMap;
    }
    pack(){
        this.instance.SPLINT_pack = new Object();
        this.instance.SPLINT_pack.name = this.instance.constructor.name
    }
    unpack(){
        if(window[this.instance.SPLINT_pack.name] != undefined){
            let instanceC = new window[this.instance.SPLINT_pack.name]();
            Object.setPrototypeOf(this.instance, instanceC.constructor.prototype);   
        }   
        delete this.instance.SPLINT_pack;   
    }
    // getSrcPath(){
        
    //     let err = new Error();
    //     return err
    // }
    secureValues(recursive = false){
        for(const e of Object.entries(this.instance)){
            Object.defineProperty(this.instance, e[0], {
                value: e[1],
                enumerable: true,
                configurable: false,
                writable: false
            })
            if(recursive){
                if(e[1] instanceof Object){
                    e[1].SPLINT.secureValues(recursive);
                }
            }
        }
    }
    log(){
        SPLINT.debugger.logUser(typeof this.instance, this.instance);
    }
    getMap(){
        return SPLINT.Tools.parse.ObjectToMap(this);
    }  
    /**
     * @param {object | string} name {variable} | 'variable' 
     */
    hideProperty(name){
        if(typeof name == 'object'){
            name = Object.keys(name)[0];
        }
        let desc = Object.getOwnPropertyDescriptor(this.instance, name);
        if(desc != undefined && (desc.get != undefined || desc.set != undefined)){
            Object.defineProperty(this.instance, name, {
                configurable : false,
                enumerable: false,
              });
              return;
        }
        Object.defineProperty(this.instance, name, {
            writable: true,
            configurable : false,
            enumerable: false,
          });
    }
    // Object.defineProperty(Object.prototype.constructor, "SPLINT1", {
    //     get: function(){
    //         return new S_ObjectFunctions(this);
    //     }
    // })
    // static eachRecursive(obj, callback = function(){}){
    //     for (var k in obj){
    //         callback(k)
    //         if (typeof obj[k] == "object" && obj[k] !== null){
    //             this.eachRecursive(obj[k], callback);
    //         } else {

    //         }
    //     }
    // }
    // static iter(obj_in, callback_in = function(element, entry, key, index){}){
    //     function func(obj, callback){
    //         for(const property in obj) {
    //             if(obj.hasOwnProperty(property)) {
    //                 callback(obj, property)
    //                 if(typeof obj[property] == "object") {
    //                     iterate(obj[property], stack + '.' + property);
    //                 } else {
    //                     console.log(property + "   " + obj[property]);
    //                     $('#output').append($("<div/>").text(stack + '.' + property))
    //                 }
    //             }
    //         }
    //     }
    //     func(obj_in, callback_in, e_in);
    // }
    static iter(obj_in, e_in, callback_in = function(element, entry, key, index){}){
        function func(obj, callback, ...args){
            let entries = Object.entries(obj);
            let keys    = Object.keys(obj);
            for (const [key, value] of entries.reverse()) {
                let entry = obj[key]
                let element = callback(args[0], entry, key, keys.indexOf(key), obj);
                    if(element == false){
                        continue;
                    }
                    element.setAttribute("ivalue", (args[0].getAttribute("ivalue") + "." + key));
                if(typeof entry == 'object'){
                    func(entry, callback, element);
                }
            }
        }
        func(obj_in, callback_in, e_in);
    }
    toDOMStructure(parent, callback = function(element, key, value){}){
        parent.setAttribute("ivalue", "start");
        let obj = this.instance;
        if(this.instance instanceof autoObject){
            obj = this.instance.parseToObject();
        }
        S_ObjectFunctions.iter(obj, parent, callback);
        return obj;
    }
}
class autoObject extends Object {
    static get [Symbol.species]() { return Object; }
    static {
        Object.defineProperty(Object.prototype, "SPLINT", {
            get: function(){
                return new S_ObjectFunctions(this);
            }, 
            enumerable: false,
            configurable: true
        })
        Object.defineProperty(Object.prototype, "log", {
            value: function(){
                SPLINT.debugger.logUser(typeof this, this);
            },
            enumerable: false,
            writable: false,
            configurable: false
        })
    }
    constructor(stack = "OBJ", saveStack = false){
        super();
        if(stack === true){
            saveStack = true;
            // this.saveStack = true;
            stack = "OBJ";
            this.stack = "OBJ";
        } else if(stack === false){
            // this.stack = false;
            // this.saveStack = false;
        } else {
            this.stack = stack;
            // this.saveStack = saveStack;
        }
        // if(saveStack){

        Object.defineProperty(this, "stack", {
            // value: "AAA",
            writable: false,
            configurable: false,
            enumerable: false  
        
        });
        // Object.defineProperty(autoObject.prototype, "stack", {
        //     get(){
        //         return stack;
        //     },
        //     set(v){
        //         SPLINT.debugger.error("autoObject", "cannot modify 'AO-stack'")
        //     },
        //     configurable: false,
        //     enumerable: false  
        
        // });
        // }
        return new Proxy(this, {
            get(target, prop, receiver){
                if (prop === 'toJSON') {
                  return () => (target)
                }
                if(Reflect.has(target, prop)){
                    return target[prop];
                } else {
                    if(typeof prop == 'symbol'){
                        prop = prop.toString();
                    }
                    SPLINT.debugger.warn("autoObject", "generated -> " + target.stack + "[" + prop + "]", [["[", "]"], "color: orange; font-weight: bold"]);
                    console.groupEnd();
                    stack = target.stack + "." + prop;

                    if(stack.includes("undefined")){
                        stack = false;
                    }
                    target[prop] = new SPLINT.Types.autoObject(stack);

                    return target[prop];
                }
            },
            set(target, symbol, value, receiver){
                target[symbol] = value;
                return true;
            }
        })
    }
    log(){
        console.log(this.parseToObject());
    }
    dir(){
        console.dir(this.parseToObject());
    }
    parseToObject(){
        function unproxify(val) {
            if (val instanceof Array){
                let b = val.map(unproxify);
                return b
            } 
            if (val instanceof Object) {
                let a = Object.fromEntries(Object.entries(Object.assign({},val)).map(([k,v])=>[k,unproxify(v)]))
                return a
            }
            return val
        }
        return unproxify(this);
    }
    toDOMStructure(parent, callback = function(element, key, value){}){
        parent.setAttribute("ivalue", "start");
        let obj = this.parseToObject();
        S_ObjectFunctions.iter(obj, parent, callback);
        return obj;
    }
    getKeys(){
        return Object.keys(this);
    }
    getSize(){
        return this.getKeys().length;
    }
    isEmpty(){
        if(Object.keys(this).length > 0){
            return false;
        }
        return true;
    }
}

