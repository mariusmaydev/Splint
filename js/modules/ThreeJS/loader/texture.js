import SPLINT from 'SPLINT';
import * as THREE from 'three';

export default class Texture {
    static load(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        return new THREE.TextureLoader().load(uri, onLoad, onProgress, onError);
    }
    static loadFromProject(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new THREE.TextureLoader().load(SPLINT.config.URIs.project + "/" + uri, onLoad, onProgress, onError);
    }
    static async loadFromRoot(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new THREE.TextureLoader().loadAsync(location.origin + "/" + uri, onLoad, onProgress, onError);
    }
    static loadFromSplint(uri, onLoad = function(){}, onProgress = function(){}, onError = function(){}){
        if(uri[0] == "/"){
            uri = uri.slice(1);
        }
        return new THREE.TextureLoader().load(SPLINT.config.URIs.splint + "/" + uri, onLoad, onProgress, onError);
    }
}