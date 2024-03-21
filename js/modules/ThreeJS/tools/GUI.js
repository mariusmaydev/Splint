
import GUI from "@THREE_ADDONS/libs/lil-gui.module.min.js";
///examples/jsm/libs/lil-gui.module.min.js";

export default class S_GUI {
    static #INSTANCE = null;
    static {
        let g = Object.getOwnPropertyDescriptors(GUI.prototype);
        for(const [key, value] of Object.entries(g)) {
            Object.defineProperty(S_GUI, key, {
                value: function(){
                    return this.instance[key](...arguments);
                },
                writable: true,
                enumerable: false,
                configurable: true
            });
        }
    }
    static get instance(){
        if(this.#INSTANCE == null){
            this.#INSTANCE = new GUI();
            this.#INSTANCE.hide();
        }
        return this.#INSTANCE;
    }
    static set instance(v){
        this.#INSTANCE = v;
    }
    static remove(){
        this.instance.destroy();
        this.instance = null;
    }
    static loadObj(obj, title = null){
        if(this.instance._hidden){
            return this.instance;
        }
        if(title == null){
            title = "none";
            if(obj.name != undefined){
                title = obj.name;
            }
            if(obj.type != undefined) {
                title += "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + obj.type;
            }
        }
        let f = S_GUI.addFolder(title);
        let objJSON = obj.toJSON();
        if(obj.isObject3D == true){
            objJSON = objJSON.object;
        }
        for(const [key, value] of Object.entries(objJSON)){
            if(obj[key] == undefined){
                continue;
            }
            if(Number.isFinite(obj[key]) && obj[key] >= 0){
                if(obj[key] <= 2){
                    f.add( obj, key, 0, 5, 0.01 );
                } else if(obj[key] <= 100){
                    f.add( obj, key, 0, 100, 0.01 );
                } else {
                    f.add( obj, key, obj[key]);
                    // for(const [key1, value1] of Object.entries(THC)){
                    //     if(value1 == obj[key]){
                    //         f.add( obj, key, {[key1]: obj[key]});
                    //     }
                    // }
                }
            } else {
                if(obj[key] instanceof Object){
                    if(obj[key].isColor == true){
                        f.addColor( obj, key);
                    } else if(obj[key].isVector2 == true){
                        let g = f.addFolder(key);
                        g.add( obj[key], 'x', 0, 10, 0.01 );
                        g.add( obj[key], 'y', 0, 10, 0.01 );
                    } else if(obj[key].isVector3 == true){
                        let g = f.addFolder(key);
                        g.add( obj[key], 'x', 0, 10, 0.01 );
                        g.add( obj[key], 'y', 0, 10, 0.01 );
                        g.add( obj[key], 'z', 0, 10, 0.01 );
                    } else if(obj[key].isTexture == true){
                    } else {
                        f.add( obj, key, obj[key]);
                    }
                } else {
                    f.add( obj, key, obj[key]);
                }
            }
        }
        f.close();
        return f;
    }
}