import {
    Mesh
} from 'three';

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