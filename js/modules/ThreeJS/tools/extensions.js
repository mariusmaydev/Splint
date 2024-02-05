
import { Mesh } from "@THREE_ROOT_DIR/src/objects/Mesh.js";

Mesh.prototype.hasParentWithName = function(name){
    let object = this;
    while(object.parent != null){
        if(object.parent.name == name){
            return true;
        }
        object = object.parent;
    }
    return false;
}