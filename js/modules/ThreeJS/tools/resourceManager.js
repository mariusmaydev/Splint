import TextureLoader from '../loader/texture.js';
import { DRACOLoader } from '../loader/DRACOLoader_Modified.js';
import { GLTFLoader } from '../loader/GLTFLoader_Modified.js';
import { utils } from './utils.js';
import SPLINT from 'SPLINT';

export default class S_resourceManager {
    static instance     = null;
    static textures     = null;
    static cubeTextures = null;
    static dataTextures = null;
    static models       = null;
    static {
        this.draco = new DRACOLoader();
        this.draco.setDecoderPath('../../../../../Splint/lib/threeJS/examples/js/libs/draco/gltf/');//lib\threeJS\examples\js\libs\draco\gltf');
        this.draco.preload();
        this.GLTFloader = new GLTFLoader();
        this.GLTFloader.setDRACOLoader(this.draco);
    } 
    static init(){
        if(S_resourceManager.instance == null){
            S_resourceManager.instance = new S_resourceManager();
        }
    }
    static get ResourceList(){
        return this.instance.loadResourceList();
    }
    constructor(){
        this.RESOURCE_LIST = null;
        this.loadResourceList().then(async function(){
            this.initResources();
        }.bind(this));
        S_resourceManager.instance = this;
    }
    async loadResourceList(){
        if(this.RESOURCE_LIST == null){
            this.RESOURCE_LIST = SPLINT.file.loadFromProjectAsync("/Splint/splint.config/resource.list.json");
            this.RESOURCE_LIST = this.RESOURCE_LIST.then(async function(data){
                this.RESOURCE_LIST = data.toObject();
                return this.RESOURCE_LIST;
            }.bind(this))
        }
        return this.RESOURCE_LIST;
    }
    async initResources(){
        S_resourceManager.textures      = this.RESOURCE_LIST.paths.textures;
        S_resourceManager.cubeTextures  = this.RESOURCE_LIST.paths.cubeTextures;
        S_resourceManager.dataTextures  = this.RESOURCE_LIST.paths.dataTextures;
        S_resourceManager.models        = this.RESOURCE_LIST.paths.models;
        for(const [key, value] of Object.entries(S_resourceManager.textures)){
            this.#addEntryTexture(key, value, "normal");
        }
        for(const [key, value] of Object.entries(S_resourceManager.models)){
            this.#addEntryModel(key, value);
        }
        for(const [key, value] of Object.entries(S_resourceManager.cubeTextures)){
            this.#addEntryTexture(key, value, "cube");
        }
        for(const [key, value] of Object.entries(S_resourceManager.dataTextures)){
            this.#addEntryTexture(key, value, "data");
        }
    }
    static async loadTextureAsync(name, url, type = "normal"){
        if(type == "normal"){
            if(S_resourceManager.textures[name] == undefined){
                this.instance.#addEntryTexture(name, url);
            }
            return S_resourceManager.textures[name];
        } else if(type == "cube"){
            if(S_resourceManager.cubeTextures[name] == undefined){
                this.instance.#addEntryTexture(name, url, type);
            }
            return S_resourceManager.cubeTextures[name];
        } else if(type == "data"){
            if(S_resourceManager.dataTextures[name] == undefined){
                this.instance.#addEntryTexture(name, url, type);
            }
            return S_resourceManager.dataTextures[name];
        }
    }
    async #addEntryTexture(key, value, type = "normal"){
        let obj = null;
        if(type == "normal"){
            obj = S_resourceManager.textures;
        } else if(type == "cube"){
            obj = S_resourceManager.cubeTextures;
        } else if(type == "data"){
            obj = S_resourceManager.dataTextures;
        }
        obj[key + "_data"] = value;
        obj[key + "_path"] = value;
        obj.SPLINT.hideProperty(key + "_data");
        Object.defineProperty(obj, key, {
            get: async function(){
                if(typeof obj[key + "_data"] == 'object'){
                    return obj[key + "_data"];
                } else {
                    let texture = TextureLoader.loadFromProjectAsync(obj[key + "_data"], type);
                    obj[key + "_data"] = texture;
                    return texture;
                }
            },
            set: function (v) {
                obj[key + "_data"] = new Promise(async function(resolve){
                    resolve(v);
                });
            },
            enumerable: true,
            configurable: false
        })
    }
    async #addEntryModel(key, value){
        S_resourceManager.models[key + "_data"] = value;
        S_resourceManager.models.SPLINT.hideProperty(key + "_data");
        Object.defineProperty(S_resourceManager.models, key, {
            get: async function(){
                if(typeof S_resourceManager.models[key + "_data"] == 'object'){
                    return S_resourceManager.models[key + "_data"];
                } else {
                    return new Promise(async function(resolve, reject){
                        let model = await S_resourceManager.GLTFloader.loadAsync(SPLINT.config.URIs.project + "/" + value);
                        S_resourceManager.models[key + "_data"] = model;
                        S_resourceManager.models[key + "_data"].scene = S_resourceManager.models[key + "_data"].scene.children[0];
                        S_resourceManager.models[key + "_data"].scene.name = utils.getFileNameFromURI(value);
                        resolve(S_resourceManager.models[key + "_data"]);
                        return S_resourceManager.models[key + "_data"];
                    }.bind(this));
                }
            },
            set: async function (v) {
                S_resourceManager.models[key + "_data"] = v;
            },
            enumerable: true,
            configurable: false
        })
    }
}