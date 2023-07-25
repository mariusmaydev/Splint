
// import { AmbientLight as T_AmbientLight } from "@THREE_ROOT_DIR/src/lights/AmbientLight.js";
import { AmbientLight as T_AmbientLight } from "three";
// import { PointLightHelper } from "@THREE_ROOT_DIR/src/helpers/PointLightHelper";

export default class AmbientLight extends T_AmbientLight {
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