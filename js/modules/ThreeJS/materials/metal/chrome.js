import * as THREE from 'three';
import MaterialHelper from '../MaterialHelper.js';
import { S_MATERIAL_LIST } from '../M_materials.js';
import MATERIAL_LIST from '../M_materials.js';
// import M_material from '../M_material.js';
import SPLINT from 'SPLINT';

export default class material_chrome {
    static light(color = 0xffffff, envMap = null){

        let material = null;
        let HELPER = new MaterialHelper("chrome");
        if(HELPER.material != undefined){
            material =  MaterialHelper.cloneMaterial(HELPER.material);
            material.color.set(color);
            material.needsUpdate = true;
            return material;
        };
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
        // envMap = MaterialHelper.getTexture(SPLINT.resources.textures.lighter_inner_envMap);
        // // envMap = SPLINT.resources.textures.lighter_inner_envMap;
        //     envMap.wrapS = THREE.RepeatWrapping;
        //     envMap.wrapT = THREE.RepeatWrapping;
        //     // texture.repeat.set(1, 0.6156);
        //     envMap.flipY = false;
        //     envMap.repeat.set(0.001, 0.001);          
        //     envMap.mapping = THREE.EquirectangularReflectionMapping;
        //     envMap.generateMipmaps = true;
        //     envMap.magFilter = THREE.LinearFilter;
        //     envMap.minFilter = THREE.LinearMipmapLinearFilter;
        //     envMap.anisotropy = 16;
        //     envMap.premultiplyAlpha = false;
        //     envMap.needsUpdate = true;

        material = new THREE.MeshPhysicalMaterial( {
            color: color,
            // map: texture,
            // blending: THREE.NormalBlending,
            opacity: 2,
            metalness: 0.9,   // between 0 and 1
            roughness: 0.5, // between 0 and 1
            // envMap: envMap,
            envMapIntensity: 0.5,
            depthFunc: THREE.LessEqualDepth,
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
        material.needsUpdate = true;
        HELPER.material = material;
        return material;
    }    
}