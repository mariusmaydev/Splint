
// import { HemisphereLight as T_HemisphereLight } from "@THREE_ROOT_DIR/src/lights/HemisphereLight.js";
// import { HemisphereLightHelper } from "@THREE_ROOT_DIR/src/helpers/HemisphereLightHelper.js";

import {
    HemisphereLight as T_HemisphereLight,
    HemisphereLightHelper
} from 'three';

export default class HemisphereLight extends T_HemisphereLight {
    constructor(skyColor, goundColor, intensity){
        super(skyColor, goundColor, intensity);
        this.debugg = false;
        this.helper = new Object();
        this.helper.size = 1;
        this.helper.color = 0x00ff00;
    }
    bind(debugg = this.debugg){
        if(this.scene == null){
            console.error("No scene set\n %c-> %cuse scene.add(<obj>) instead", "color:black;", "color:red;");
            return;
        }
        if(debugg){
            this.helper = new HemisphereLightHelper(this, this.helper.size, this.helper.color);

            this.scene.add(this);
            this.scene.add(this.helper)
        } else {
            this.scene.add(this);
        }
    }
}