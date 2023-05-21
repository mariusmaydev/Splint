
import * as THREE from 'threeJS';

export default class Plane {
    constructor(width, height, wS, hS){
        this.pos = new Object();
        this.pos.x = 0;
        this.pos.y = 0;
        this.pos.z = 0;

        this.planeGeo = new THREE.PlaneGeometry(width, height, wS, hS);
        this.plane = new THREE.Mesh(this.planeGeo);
        this.plane.material.side = THREE.DoubleSide;

        this.plane.receiveShadow = false;
        this.plane.material.side = THREE.DoubleSide;
        this.plane.castShadow = false;
    }
    position(x = 0, y = 0, z = 0){
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
        
        this.plane.position.x = x;
        this.plane.position.y = y;
        this.plane.position.z = z;
    }
    rotate(x = 0, y = 0, z = 0){
        this.plane.rotation.x = x * Math.PI / 180;
        this.plane.rotation.y = y * Math.PI / 180;
        this.plane.rotation.z = z * Math.PI / 180;
    }
    set material(mat){
        this.plane.material = mat;
        this._material = mat;
        this.plane.receiveShadow = false;
        this.plane.material.side = THREE.DoubleSide;
        this.plane.castShadow = false;
    }
    setMapOffset(x, y){
        let material = this.plane.material;
        if(material.bumpMap != null){
            material.bumpMap.offset.x = x;
            material.bumpMap.offset.y = y;
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
    setMapRepeat(x, y){
        let material = this.plane.material;
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
    get(){
        return this.plane;
    }
}