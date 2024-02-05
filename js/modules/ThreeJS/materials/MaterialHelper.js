// import * as THREE from 'three';
// import {
    // Texture,
// } from 'three';
import { Texture } from "@THREE_ROOT_DIR/src/textures/Texture.js";

export default class MaterialHelper {
    constructor(name, renderer = null){
        this.renderer = renderer;
        this.name = name;
        this.material = window.SPLINT.threeJS.materials[this.name];
    }
    set material(v){
        window.SPLINT.threeJS.materials[this.name] = v;
    }
    get material(){
        return window.SPLINT.threeJS.materials[this.name];
    }
    static getTexture(texture_in){
        let texture = texture_in.clone()
            texture.__webglTexture      = texture_in.__webglTexture;
            texture.__webglInit         = true;
            texture.needsUpdate         = true;
            if(this.renderer != null){
                texture.anisotropy      = this.renderer.getMaxAnisotropy();
            } else {  
                texture.anisotropy      = 16;
            }
            texture.needsUpdate = true;
        return texture;
    }
    static cloneMaterial(materialIn){
        let material = materialIn.clone();
        for (const [key, value] of Object.entries(materialIn)) {

            if( value instanceof Texture){
                material[key] = MaterialHelper.getTexture(materialIn[key]);
                material[key].needsUpdate = true;
            }
        }

        return material;
    }
}