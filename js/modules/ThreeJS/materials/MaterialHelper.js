
// import { Texture } from "@THREE_ROOT_DIR/src/textures/Texture.js";
// import { CanvasTexture } from "@THREE_ROOT_DIR/src/textures/CanvasTexture.js";
import TextureCache from "./TextureCache.js";
import * as THREE from '@THREE';

export default class MaterialHelper {
    static materials = new Object();
    static {
        Object.defineProperty(S_ObjectFunctions.prototype, "ThreeClone", {
            value: function(){
                if(this.instance.isTexture){
                    return MaterialHelper.getTexture(this.instance);
                }
            },
            enumerable: false,
            configurable: false,
            writable: false
        });
    }
    static get TextureCache(){
        return TextureCache;
    }
    static get(name){
        if(this.materials[name] != undefined){
            return this.materials[name];
        } else {
            return false;
        }
    }
    static set(material){
        this.materials[material.name] = material;
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

            if( value instanceof THREE.Texture && !material[key].isRenderTargetTexture){
                material[key] = MaterialHelper.getTexture(materialIn[key]);
                material[key].needsUpdate = true;
            }
        }

        return material;
    }
    static setMapAttributes(material, obj){
        for(const value of Object.values(material)){
            if(value != null && value.isTexture){
                for(const e of Object.entries(obj)){
                    value[e[0]] = e[1];
                }
                value.needsUpdate = true;
            }
        }
    }
    static setMapOffset(material, x, y){
        if(material.bumpMap != null){
            material.bumpMap.offset.x = x;
            material.bumpMap.offset.y = y;
        }
        if(material.alphaMap != null){
            material.alphaMap.offset.x = x;
            material.alphaMap.offset.y = y;
        }
        if(material.map != null){
            material.map.offset.x = x;
            material.map.offset.y = y;
        }
        if(material.normalMap != null){
            material.normalMap.offset.x = x;
            material.normalMap.offset.y = y;
        }
        if(material.specularMap != null){
            material.specularMap.offset.x = x;
            material.specularMap.offset.y = y;
        }
        if(material.displacementMap != null){
            material.displacementMap.offset.x = x;
            material.displacementMap.offset.y = y;
        }
    }
    static setMapRepeat(material, x, y){
        if(material.alphaMap != null){
            material.alphaMap.repeat.x = x;
            material.alphaMap.repeat.y = y;
        }
        if(material.bumpMap != null){
            material.bumpMap.repeat.x = x;
            material.bumpMap.repeat.y = y;
        }
        if(material.map != null){
            material.map.repeat.x = x;
            material.map.repeat.y = y;
        }
        if(material.normalMap != null){
            material.normalMap.repeat.x = x;
            material.normalMap.repeat.y = y;
        }
        if(material.specularMap != null){
            material.specularMap.repeat.x = x;
            material.specularMap.repeat.y = y;
        }
        if(material.displacementMap != null){
            material.displacementMap.repeat.x = x;
            material.displacementMap.repeat.y = y;
        }
    }
    static getTransparentTexture(texture, ColorPreserve = {r: 255, g: 247, b: 214, a: 100}, func = function(data, color, i){
        return data[i] <= color.r
        && data[i + 1] <= color.g
        && data[i + 2] <= color.b
        && data[i + 3] >= color.a;
    }){

        let canvas = document.createElement('canvas');
            canvas.width = texture.source.data.width;
            canvas.height = texture.source.data.height;

        // Get the canvas drawing context, and draw the image to it.
        let context = canvas.getContext('2d');
            context.drawImage(texture.source.data, 0, 0, canvas.width, canvas.height);

        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Create a function for preserving a specified colour.
        let preserveColor = function(imageData, color) {
            // Get the pixel data from the source.
            let data = imageData.data;
            // Iterate through all the pixels.
            for (let i = 0; i < data.length; i += 4) {
                // Check if the current pixel should have preserved transparency. This simply compares whether the color we passed in is equivalent to our pixel data.
                let preserve = func(data, color, i);
                // data[i] <= color.r
                //     && data[i + 1] <= color.g
                //     && data[i + 2] <= color.b
                //     && data[i + 3] >= color.a;

                // Either preserve the initial transparency or set the transparency to 0.
                data[i + 3] = preserve ? data[i + 3] : 0;
            }
            return imageData;
        };

        // Get the new pixel data and set it to the canvas context.
        let newData = preserveColor(imageData, ColorPreserve);
        context.putImageData(newData, 0, 0);
        let textureOut = new THREE.CanvasTexture(canvas);
            textureOut.needsUpdate = true;
        return textureOut;
    }
}