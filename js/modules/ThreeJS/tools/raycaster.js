import {
    Raycaster,
    Vector2,
} from 'three';
// import {Raycaster} from "@THREE_ROOT_DIR/src/core/Raycaster.js";
// import {Vector2} from "@THREE_ROOT_DIR/src/math/Vector2.js";
import { utils } from './utils.js';

export default class S_raycaster {
    constructor(instance) {
        this.inst = instance;
        this.raycaster = new Raycaster();
        this.raycaster.params.Points.threshold = 0.1;
        this.objects = [];
        this.scene = this.inst.scene;
        this.mouseDownFlag = false;
        this.pointer = new Vector2();
        this.active = true;
    }

    set onMouseUp(func){
        this._onMouseUp = func;
        document.addEventListener('mouseup', this.#onMouse.bind(this, "down"), false);
    }
    get onMouseUp(){
        return this._onMouseUp;
    }
    set onMouseMove(func){
        this._onMouseMove = func;
        document.addEventListener('mousemove', this.#onMouse.bind(this, "click"), false); 
    }
    get onMouseMove(){
        return this._onMouseMove;
    }
    set onMouseDown(func){
        this._onMouseDown = func;
        document.addEventListener('mousedown', this.#onMouse.bind(this, "down"), false);
    }
    get onMouseDown(){
        return this._onMouseDown;
    }
    set onMouseClick(func){
        this._onMouseClick = func;
        document.addEventListener('click', this.#onMouse.bind(this, "click"), false); 
    }
    get onMouseClick(){
        return this._onMouseClick;
    }
    setScene(scene){
        this.scene = scene;
    }
    addObject(objectName){
        let object = utils.getObjByKey_Value(this.scene.children, "name", objectName);
        if(object.children.length > 0){
            this.objects.push(object.children[0]);
        } else {
            this.objects.push(object);
        }
    }
    #onMouse(flag, event){
        if(!this.active){
            return;
        }
        event.preventDefault();
        const rect = this.inst.canvas.getBoundingClientRect();
        this.pointer.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
        this.pointer.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.inst.camera);
        const intersects = this.raycaster.intersectObjects(this.objects, false);
        // console.log(this.objects);

        if (intersects.length > 0) {
            if(flag == "down"){
                this.mouseDownFlag = true;
                this.onMouseDown(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "up"){
                this.mouseDownFlag = false;
                this.onMouseUp(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "move"){
                this.onMouseMove(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "click"){
                this.onMouseClick(intersects[0], intersects[0].object.parent.name);
            }
        }
    }
}