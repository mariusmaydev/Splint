
import * as THREE from 'three';
import TEXTURE from './loader/texture.js';
import FILE from './loader/file.js';
import OBJECTS from './objects/objects.js';
import MOUSEHANDLER from './tools/mouseHandler.js';
import { GLTFLoader } from '@THREE_MODULES_DIR/loaders/GLTFLoader.js';
import { SVGLoader } from '@THREE_MODULES_DIR/loaders/SVGLoader.js';
import { DRACOLoader } from '@THREE_MODULES_DIR/loaders/DRACOLoader.js';
import { utils } from './tools/utils.js';
export * as ANIMATIONS from './animations/animations.js';
import * as ANIMATIONS from './animations/animations.js';
import SVGModelLoader from './loader/svg.js';
import RAYCASTER from './tools/raycaster.js';
import './tools/extensions.js';

export * as lights from './light/light.js';

var CONFIG = null;
var RESOURCES = null;

const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');


// Splint\lib\threeJS\examples\js\libs\draco
// 'http://localhost/Splint/lib/threeJS/examples/js/libs/draco/'
export default class SPLINT extends window.SPLINT {
    static raycaster(instance){
        return new RAYCASTER(instance);
    }
    static {
        
        if(window.SPLINT.threeJS == undefined){
            window.SPLINT.threeJS = new Object();
        }
        if(window.SPLINT.threeJS.materials == undefined){
            window.SPLINT.threeJS.materials = new Object();
        }
    }
    static R_promise = null;
    static get config(){
        if(CONFIG == null){
            let projectName = location.pathname.split('/')[1];
            let path = location.origin + "/" + projectName + "/Splint/" + "splint.config/config.main.json";
            let configOBJ = JSON.parse(FILE.read(path));
                configOBJ.URIs = new Object();
                configOBJ.URIs.project  = location.origin + "/" + projectName;
                configOBJ.URIs.splint   = location.origin + "/Splint";
            CONFIG = configOBJ;
            return configOBJ;
        } else {
            return CONFIG;
        }
    }
    static async preloadResources(){
        SPLINT.R_promise = new Promise(async function(resolve){
            let res = SPLINT.file.loadFromProject("/Splint/splint.config/resource.list.json").toObject();
            RESOURCES = new Object();
            RESOURCES.textures = new Object();
            RESOURCES.SVGs = new Object();
            RESOURCES.models = new Object();
            let loader = new GLTFLoader();
            let svgLoader = new SVGLoader();

                loader.setDRACOLoader(draco);
            for(const [key, value] of Object.entries(res.paths.textures)) {
                RESOURCES.textures[key] = TEXTURE.loadFromProject(value);
                RESOURCES.textures[key].name = utils.getFileNameFromURI(value);
            }
            for(const [key, value] of Object.entries(res.paths.models)) {
                RESOURCES.models[key] = await loader.loadAsync(SPLINT.config.URIs.project + "/" + value);
                RESOURCES.models[key].scene.name = utils.getFileNameFromURI(value);
            }
            for(const [key, value] of Object.entries(res.paths.SVGs)) {
                RESOURCES.SVGs[key] = await svgLoader.loadAsync(SPLINT.config.URIs.project + "/" + value);
                RESOURCES.SVGs[key].name = utils.getFileNameFromURI(value);
            }
            resolve('resolved');
        });
    }
    static get resources(){
        return RESOURCES;
    }
    static get URIs(){
        return SPLINT.config.URIs;
    }
    static get paths(){
        return SPLINT.config.paths;
    }
    static get port(){
        return SPLINT.config.port;
    }
    static get SSL(){
        return SPLINT.config.SSL;
    }
    static get host(){
        return SPLINT.config.host;
    }
    static get texture(){
        return TEXTURE;
    }
    static get object(){
        return OBJECTS;
    }
    static MouseHandler(parent){
        return new MOUSEHANDLER(parent);
    }
    static get file(){
        return FILE;
    }
    static get Animation(){
        return ANIMATIONS.Animation;
    }
    static get AnimationFX(){
        return ANIMATIONS.FX;
    }
    
    static get AnimationMixer(){
        return ANIMATIONS.Mixer;
    }
    static get Utils(){
        return utils;
    }
    static get SVGModelLoader(){
        return SVGModelLoader;
    }
}

// async function loadA(url) {
//     let loader = new GLTFLoader();
//     let urlString = url.toString() 
//     let gltf = await loader.loadAsync(urlString);
//     return gltf.scene.clone();
//   }

//   THREE.Object3D.prototype.GdeepCloneMaterials = function() {
//     var object = this.clone( new THREE.Object3D(), false );

//     for ( var i = 0; i < this.children.length; i++ ) {

//         var child = this.children[ i ];
//         if ( child.GdeepCloneMaterials ) {
//             object.add( child.GdeepCloneMaterials() );
//         } else {
//             object.add( child.clone() );
//         }

//     }
//     return object;
// };

// THREE.Mesh.prototype.GdeepCloneMaterials = function( object, recursive ) {
//     if ( object === undefined ) {
//         object = new THREE.Mesh( this.geometry, this.material.clone() );
//     }

//     THREE.Object3D.prototype.GdeepCloneMaterials.call( this, object, recursive );

//     return object;
// };