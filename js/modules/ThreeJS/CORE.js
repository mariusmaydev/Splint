
import TEXTURE from './loader/texture.js';
import FILE from './loader/file.js';
import OBJECTS from './objects/objects.js';
import MOUSEHANDLER from './tools/mouseHandler.js';
import { GLTFLoader } from '@THREE_MODULES_DIR/loaders/GLTFLoader.js';
// import { SVGLoader } from '@THREE_MODULES_DIR/loaders/SVGLoader.js';
import { DRACOLoader } from '@THREE_MODULES_DIR/loaders/DRACOLoader.js';
import { utils } from './tools/utils.js';
// import { Loader as loader1} from '@THREE_ROOT_DIR/editor/js/Loader.js'

// export * as ANIMATIONS from './animations/animations.js';
import * as ANIMATIONS from './animations/animations.js';
// import SVGModelLoader from './loader/svg.js';
import RAYCASTER from './tools/raycaster.js';
import './tools/extensions.js';

export * as lights from './light/light.js';

var CONFIG = null;
var RESOURCES = null;

const draco = new DRACOLoader();
draco.setDecoderPath('http://localhost/Splint/lib/threeJS/examples/js/libs/draco/gltf/');//lib\threeJS\examples\js\libs\draco\gltf');


// Splint\lib\threeJS\examples\js\libs\draco
// 'http://localhost/Splint/lib/threeJS/examples/js/libs/draco/'
export default class SPLINT extends window.SPLINT {
    static resourceList = null;
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
            let res = (await SPLINT.file.loadFromProjectAsync("/Splint/splint.config/resource.list.json")).toObject();


            SPLINT.resourceList = res.paths;
            console.dir(SPLINT);
            RESOURCES = new Object();
            RESOURCES.textures = new Object();
            RESOURCES.SVGs = new Object();
            RESOURCES.models = new Object();
            // let l1 = new loader1();
            let loader = new GLTFLoader();
            // let svgLoader = new SVGLoader();

                loader.setDRACOLoader(draco);
            for(const [key, value] of Object.entries(res.paths.textures)) {
                RESOURCES.textures[key] = TEXTURE.loadFromProject(value);
                RESOURCES.textures[key].name = utils.getFileNameFromURI(value);
            }
            for(const [key, value] of Object.entries(res.paths.models)) {
                // debugger
                // draco.loadAsync()
                RESOURCES.models[key] = await loader.loadAsync(SPLINT.config.URIs.project + "/" + value);
                console.log(RESOURCES.models[key]);
                RESOURCES.models[key].scene = RESOURCES.models[key].scene.children[0]
                RESOURCES.models[key].scene.name = utils.getFileNameFromURI(value);
            }
            // for(const [key, value] of Object.entries(res.paths.SVGs)) {
            //     RESOURCES.SVGs[key] = await svgLoader.loadAsync(SPLINT.config.URIs.project + "/" + value);
            //     RESOURCES.SVGs[key].name = utils.getFileNameFromURI(value);
            // }
            // async function f(r){
            //     for(const e of Object.entries(r)){
            //         console.log(e);
            //         if(typeof e[1] === "string"){
            //             Object.defineProperty(r, e[0] + "_save", {
            //                 value: e[1]
            //             })
            //             Object.defineProperty(r, e[0], {
            //                 get: async function(){
            //                     console.log(this[e[0] + "_save"])
            //                     if(this[e[0] + "_save"].includes("/textures/")){
            //                         RESOURCES.textures[e[0]] = TEXTURE.loadFromProject(this[e[0] + "_save"]);
            //                         RESOURCES.textures[e[0]].name = utils.getFileNameFromURI(this[e[0] + "_save"]);
            //                         return RESOURCES.textures[e[0]];
            //                     }
            //                     if(this[e[0] + "_save"].includes("/3Dmodels/")){
            //                         RESOURCES.models[e[0]] = (await loader.loadAsync(SPLINT.config.URIs.project + "/" + this[e[0] + "_save"]));
            //                         RESOURCES.models[e[0]].scene = RESOURCES.models[e[0]].scene.children[0]
            //                         RESOURCES.models[e[0]].scene.name = utils.getFileNameFromURI(this[e[0] + "_save"]);
            //                         return RESOURCES.models[e[0]];
            //                     }
            //                     if(this[e[0] + "_save"].includes("/SVGs/")){
            //                         RESOURCES.SVGs[e[0]] = (await svgLoader.loadAsync(SPLINT.config.URIs.project + "/" + this[e[0] + "_save"]));
            //                         RESOURCES.SVGs[e[0]].name = utils.getFileNameFromURI(this[e[0] + "_save"]);
            //                         return RESOURCES.SVGs[e[0]];
            //                     }
            //                     return false;
            //                 },
            //                 configurable: false,
            //                 enumerable: false
            //             })
            //         } else if(typeof e[1] === "object"){
            //             await f(e[1]);
            //         }
            //     }

            // }
            // f(res.paths).then(async function(){
            //     console.dir(await SPLINT.resourceList);
            // });
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
    // static get SVGModelLoader(){
    //     return SVGModelLoader;
    // }
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