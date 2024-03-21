import SPLINT from 'SPLINT';
import * as THREE from '@THREE';
import { RGBELoader } from '@THREE_ADDONS/loaders/RGBELoader.js';

export default class Texture {
    static loader;
    static cubeLoader;
    static rgbeLoader;
    static {
        Texture.loader = new THREE.TextureLoader();
        Texture.cubeLoader = new THREE.CubeTextureLoader();
        Texture.rgbeLoader = new RGBELoader();
    }
    static List(){
        
    }
    static load(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        return new THREE.TextureLoader().load(uri, onLoad, onProgress, onError);
    }
    static loadFromProject(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new THREE.TextureLoader().load(SPLINT.config.URIs.project + "/" + uri, onLoad, onProgress, onError);
    }
    static async loadFromProjectAsync(uri, type = "normal"){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        if(type == "normal"){
            return Texture.loader.loadAsync(SPLINT.config.URIs.project + "/" + uri);
        } else if(type == "cube"){
			let path = SPLINT.config.URIs.project + "/" + uri;//'../../../../../../Splint/lib/threeJS/examples/textures/cube/SwedishRoyalCastle/';
			let format = '.jpg';
			let urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];
			return Texture.cubeLoader.loadAsync( urls );
        } else if(type == "data"){
            return Texture.rgbeLoader.loadAsync(SPLINT.config.URIs.project + "/" + uri);
        }
    }
    static async loadFromRoot(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return Texture.loader.loadAsync(location.origin + "/" + uri, onLoad, onProgress, onError);
    }
    static loadFromSplint(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new THREE.TextureLoader().load(SPLINT.config.URIs.splint + "/" + uri, onLoad, onProgress, onError);
    }
}