
import HEMISPHERE from './types/HemisphereLight.js';
import SPOT from './types/SpotLight.js';
import POINT from './types/PointLight.js';
import DIRECTIONAL from './types/DirectionalLight.js';
import AMBIENT from './types/AmbientLight.js';

export class lightCluster {
    constructor(scene, debugg = false){
        this.scene = scene;
        this.debugg = debugg;
        this.helper = new Object();
        this.helper.size = 1;
    }
    get new(){
        return new lightList(this.scene, this.debugg, this.helper.size);
    }
}

export class lightList {
    constructor(scene, debugg = false, helperSize = 1) {
        this.scene          = scene;
        this.debugg         = debugg;
        this.helper         = new Object();
        this.helper.size    = helperSize;
    }
    HemisphereLight(skyColor, groundColor, intensity){
        let light = new HEMISPHERE(skyColor, groundColor, intensity);
            light.debugg        = this.debugg;
            light.scene         = this.scene;
            light.helper.size   = this.helper.size;
        return light;
    }
    SpotLight(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1){
        let light = new SPOT(color, intensity, distance, angle, penumbra, decay);
            light.debugg        = this.debugg;
            light.scene         = this.scene;
            light.helper.size   = this.helper.size;
        return light;
    }
    DirectionalLight(color, intensity){
        let light = new DIRECTIONAL(color, intensity);
            light.debugg        = this.debugg;
            light.scene         = this.scene;
            light.helper.size   = this.helper.size;
        return light;
    }
    PointLight(color, intensity = 1, distance = 0, decay = 2){
        let light = new POINT(color, intensity, distance, decay);
            light.debugg        = this.debugg;
            light.scene         = this.scene;
            light.helper.size   = this.helper.size;
        return light;
    }
    AmbientLight(color, intensity){
        let light = new AMBIENT(color, intensity);
            light.scene         = this.scene;
        return light;
    }
}