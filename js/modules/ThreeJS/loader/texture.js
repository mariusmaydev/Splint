import SPLINT from 'SPLINT';
// import * as THREE from 'three';
import { TextureLoader } from "@THREE_ROOT_DIR/src/loaders/TextureLoader.js";
// import TextureLoader from "../../../../"

// const 
export default class Texture {
    static loader;
    static {
        Texture.loader = new TextureLoader();
    }
    static load(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        return new TextureLoader().load(uri, onLoad, onProgress, onError);
    }
    static loadFromProject(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new TextureLoader().load(SPLINT.config.URIs.project + "/" + uri, onLoad, onProgress, onError);
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
        return new TextureLoader().load(SPLINT.config.URIs.splint + "/" + uri, onLoad, onProgress, onError);
    }
}