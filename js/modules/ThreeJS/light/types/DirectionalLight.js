import * as THREE from "@THREE";

export default class DirectionalLight extends THREE.DirectionalLight {
    constructor(color, intensity){
        super(color, intensity);
        this.debugg = false;
        this.helper = new Object();
        this.helper.size    = 1;
        this.helper.color   = 0x0000ff;
    }
    bind(debugg = this.debugg){
        if(this.scene == null){
            console.error("No scene set\n %c-> %cuse scene.add(<obj>) instead", "color:black;", "color:red;");
            return;
        }
        if(debugg){
            // this.target.updateMatrixWorld();
            this.helper = new THREE.DirectionalLightHelper(this, this.helper.size, this.helper.color);
            
            this.scene.add(this);
            this.scene.add(this.helper)
        } else {
            this.scene.add(this);
        }
    }
}