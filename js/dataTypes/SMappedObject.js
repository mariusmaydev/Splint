class S_MappedObject {
    #name;
    #value;
    #attributes = [];
    #map = [];
    #HTMLElement;
    constructor(parentMap = "BASE", name = "BASE", value = []){
        if(typeof parentMap == 'object'){
            this.#map   = [...parentMap];
        } else {
            this.#map.push(parentMap);
        }
        this.value  = value;
        if(name != undefined){
            this.name   = name;
        }
    }
    set HTMLElement(v){
        this.#HTMLElement = v;
    }
    get HTMLElement(){
        if(this.#HTMLElement == undefined){
            this.#HTMLElement = new SPLINT.DOMElement("ST_BASE", "div", document.body);
        }
        return this.#HTMLElement;
    }
    set name(v){
        this.#name = v;
        if(this.#map[this.#map.length -1] != v){
            this.#map.push(v);
        }
    }
    get name(){
        return this.#name;
    }
    set value(v){
        this.#value = v;
    }
    get value(){
        return this.#value;
    }
    get map(){
        return this.#map;
    }
    get attributes(){
        return this.#attributes;
    }
    getByMap(mapIn){
        let result = false;
        let map = [...mapIn];
            map.shift();
            function f(x, map){
                for(const v of x){
                    if(v.name == map[0]){
                        map.shift();
                        if(map.length > 0){
                            f(v.value, map);
                        } else {
                            result = v;
                            break;
                        }
                    }
                }
            }
            f(this.value, map)
            return result;
    }
    bind(name, value, HTMLElement){
        if(typeof value != 'object'){
            this.#attributes.push(value);
            return false;
        }
        let obj = new S_MappedObject(this.map, name, value);
            obj.HTMLElement = HTMLElement;
        this.value.push(obj);
        return obj;
    }
}
