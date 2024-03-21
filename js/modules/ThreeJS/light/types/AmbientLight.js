import * as THREE from "@THREE";

export default class AmbientLight extends THREE.AmbientLight {
    constructor(color, intensity){
        super(color, intensity);
    }
    bind(){
        if(this.scene == null){
            console.error("No scene set\n %c-> %cuse scene.add(<obj>) instead", "color:black;", "color:red;");
            return;
        }
        this.scene.add(this);
    }
}