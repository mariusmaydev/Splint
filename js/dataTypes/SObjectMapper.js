class S_ObjectMapper {
    #objectOut;
    constructor(object){
        this.objectIn = object;
        this.#objectOut = new S_MappedObject();
        this.callback = function(l){};
    }
    get(){
        this.#generateMap(this.objectIn, undefined, this.callback)
        return this.#objectOut;
    }
    #generateMap(objIn, lastOBJ){
        if(lastOBJ == undefined){
            lastOBJ = new S_MappedObject();
            this.#objectOut = lastOBJ;
        }
        let keys = Object.keys(objIn);
        for(const key of keys) {
            if(objIn.hasOwnProperty(key)) {
                if(typeof objIn[key] == 'object'){
                    let element = new SPLINT.DOMElement("ST_" + lastOBJ.map.join(".") + "." + key, "div", lastOBJ.HTMLElement)
                    element.setAttribute("layer", lastOBJ.map.length);
                    element.setAttribute("index", keys.indexOf(key));
                    let l = lastOBJ.bind(key, [objIn[key]], element);
                    this.callback(l);
                    this.#generateMap(objIn[key], l);
                } else {
                    let element = new SPLINT.DOMElement("ST_" + lastOBJ.map.join(".") + "." + key, "div", lastOBJ.HTMLElement)
                        element.setAttribute("layer", lastOBJ.map.length);
                        element.setAttribute("index", keys.indexOf(key));
                    lastOBJ.bind(key, objIn[key], element)
                }
            }
        }
    }
    static fromObject(objIn, callback = function(MappedObj){}){
        let c = new S_ObjectMapper(objIn);
            c.callback = callback;
        return c.get();
    }
}

class S_ObjectMapParser {
    #objOut;
    #mappedObj;
    constructor(mappedObject){
        this.#objOut = new SPLINT.autoObject();
        this.#mappedObj = mappedObject;
    }
    get(){
        this.#generate(this.#mappedObj);
        console.log(this.#objOut)
        return this.#objOut;
    }
    #generate(mappedObjIn){
        for(const entry of mappedObjIn.value){
            if(typeof entry == 'object'){
                this.#objOut[entry.map] = new SPLINT.autoObject();
                console.log(entry);
                if (Symbol.iterator in Object(entry.value)) {
                    this.#generate(entry);
                }
            }
        }
    }
}