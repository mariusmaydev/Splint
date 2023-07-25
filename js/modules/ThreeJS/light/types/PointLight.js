
// import { PointLight as T_PointLight } from "@THREE_ROOT_DIR/src/lights/PointLight.js";
// import { PointLightHelper } from "@THREE_ROOT_DIR/src/helpers/PointLightHelper.js";
import {
    PointLight as T_PointLight,
    PointLightHelper
} from 'three';

export default class PointLight extends T_PointLight {
    constructor(color, intensity = 1, distance = 0, decay = 2){
        super(color, intensity, distance, decay);
        this.debugg = false;
        this.helper = new Object();
        this.helper.size = 1;
        this.helper.color = 0xff0000;
    }
    bind(debugg = this.debugg){
        if(this.scene == null){
            console.error("No scene set\n %c-> %cuse scene.add(<obj>) instead", "color:black;", "color:red;");
            return;
        }
        if(debugg){
            this.helper = new PointLightHelper(this, this.helper.size, this.helper.color);

            this.scene.add(this);
            this.scene.add(this.helper)
        } else {
            this.scene.add(this);
        }
    }
}