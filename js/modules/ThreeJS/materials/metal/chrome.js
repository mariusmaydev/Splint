// import * as THREE from 'three';
import MaterialHelper from '../MaterialHelper.js';
// import { S_MATERIAL_LIST } from '../M_materials.js';
// import { MeshPhysicalMaterial } from "@THREE_ROOT_DIR/src/materials/MeshPhysicalMaterial.js";
import { MeshPhysicalMaterial } from "@THREE_ROOT_DIR/src/materials/MeshPhysicalMaterial.js";
import { MeshLambertMaterial } from "@THREE_ROOT_DIR/src/materials/MeshLambertMaterial.js";
// import {
//     MeshPhysicalMaterial,
// } from 'three';

import * as THC from "@THREE_ROOT_DIR/src/constants.js";
// import MATERIAL_LIST from '../M_materials.js';
// import M_material from '../M_material.js';
// import SPLINT from 'SPLINT';

export default class material_chrome {
    static light(color = 0xffffff, envMap = null, map = null){

        let material = null;
        // let HELPER = new MaterialHelper("chrome");
        // if(HELPER.material != undefined){
        //     material =  MaterialHelper.cloneMaterial(HELPER.material);
        //     material.color.set(color);
        //     material.needsUpdate = true;
        //     return material;
        // };
        // let texture = SPLINT.resources.textures.lighter_inner_texture;
            // texture.wrapS = THREE.RepeatWrapping;
            // texture.wrapT = THREE.RepeatWrapping;
            // texture.flipY = false;
            // texture.mapping = THREE.EquirectangularReflectionMapping;
            // texture.generateMipmaps = true;
            // texture.magFilter = THREE.LinearFilter;
            // texture.minFilter = THREE.LinearMipmapLinearFilter;
            // texture.anisotropy = 16;
            // texture.premultiplyAlpha = true;
            // texture.repeat.set(1, 1);
            // texture.needsUpdate = true;
            // console.log(texture);
            // if(renderer != undefined){
            // }
            if(envMap != null && map != null){
                // map = SPLINT.resources.textures.lighter_inner_texture;
                map.wrapS = THC.RepeatWrapping;
                map.wrapT = THC.RepeatWrapping;
                map.flipY = false;
                map.mapping = THC.EquirectangularReflectionMapping;
                map.generateMipmaps = true;
                map.magFilter = THC.LinearFilter;
                map.minFilter = THC.LinearMipmapLinearFilter;
                map.anisotropy = 16;
                map.premultiplyAlpha = false;
                map.repeat.set(1, 1);
                map.needsUpdate = true;

            envMap.wrapS = THC.RepeatWrapping;
            envMap.wrapT = THC.RepeatWrapping;
            // texture.repeat.set(1, 0.6156);
            envMap.flipY = false;
            // envMap.repeat.set(1, 1);          
            envMap.mapping = THC.EquirectangularReflectionMapping;
            envMap.generateMipmaps = true;
            envMap.magFilter = THC.LinearFilter;
            envMap.minFilter = THC.LinearMipmapLinearFilter;
            envMap.anisotropy = 16;
            envMap.premultiplyAlpha = false;
            envMap.needsUpdate = true;

            material = new MeshLambertMaterial( { color: 0xfff700, envMap: refractionCube, refractionRatio: 0.95 } );
        // material = new MeshPhysicalMaterial( {
        //     color: color,
        //     map: map,
        //     // blending: THREE.NormalBlending,
        //     opacity: 1,
        //     metalness: 2,   // between 0 and 1
        //     roughness: 0.5, // between 0 and 1
        //     envMap: envMap,
        //     envMapIntensity: 1,
        //     depthFunc: THC.LessEqualDepth,
        //     depthTest: true,
        //     emissive: 0x000000,
        //     emissiveIntensity: 0.2,
        //     alphaToCoverage: false,
        //     transparent: false,
        //     reflectivity: 0,
        //     clearcoat: 0,
        //     clearcoatRoughness: 0,
        //     specularColor: 0x000000,
        //     specularIntensity: 0,
        //     thickness: 0,
        //     sheenColor: 0xd6d6d6,
        //     sheenRoughness: 0,
        //     sheen: 0,
        //     ior: 0,
        //     transmission: 0
        //     // attenuationDistance: 0.00001,
        //     // attenuationColor: 0xff0000
        //     } );
        } else {
            
        material = new MeshPhysicalMaterial( {
            color: color,
            // map: texture,
            // blending: THREE.NormalBlending,
            opacity: 2,
            metalness: 0.9,   // between 0 and 1
            roughness: 0.5, // between 0 and 1
            // envMap: envMap,
            depthFunc: THC.LessEqualDepth,
            depthTest: true,
            emissive: 0x000000,
            emissiveIntensity: 0.4,
            alphaToCoverage: false,
            transparent: false,
            // reflectivity: 0.2,
            clearcoat: 4,
            clearcoatRoughness: 1,
            specularColor: 0x000000,
            specularIntensity: 2,
            thickness: 0,
            sheenColor: 0xd6d6d6,
            sheenRoughness: 0.2,
            sheen: 4,
            ior: 1,
            transmission: 0
            // attenuationDistance: 0.00001,
            // attenuationColor: 0xff0000
            } );
        }
        material.needsUpdate = true;
        return material;
    }    
}