import * as THREE from 'three';

export default class SpotLight extends THREE.SpotLight {
    constructor(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1){
        super(color, intensity, distance, angle, penumbra, decay);
        this.debugg = false;
        this.helper = new Object();
        this.helper.color = 0xf000ff;
    }
    bind(debugg = this.debugg){
        if(this.scene == null){
            console.error("No scene set\n %c-> %cuse scene.add(<obj>) instead", "color:black;", "color:red;");
            return;
        }
        if(debugg){
            this.target.updateMatrixWorld();
            this.helper = new THREE.SpotLightHelper(this, this.helper.color);

            this.scene.add(this);
            this.scene.add(this.helper)
        } else {
            this.scene.add(this);
        }
    }
}