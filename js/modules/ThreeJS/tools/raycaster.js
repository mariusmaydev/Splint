
import * as THREE from '@THREE';
import { utils } from './utils.js';

export default class S_raycaster {
    #_list = [];
    constructor(instance) {
        this.inst = instance;
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points.threshold = 0.1;
        this.objects = [];
        this.scene = this.inst.scene;
        this.mouseDownFlag = false;
        this.pointer = new THREE.Vector2();
        this.active = true;
        this.doesHover = false;
    }
    set #onremove(v){
        this.#_list.push(v);
    }
    set onMouseUp(func){
        this._onMouseUp = func;
        let x = this.#onMouse.bind(this, "up");
        let y = this.#onMouse.bind(this, "up");
        document.addEventListener('touchend', x, false);
        document.addEventListener('mouseup', y, false);

        this.#onremove = function(){
            document.removeEventListener("touchend", x, false);
            document.removeEventListener("mouseup", y, false);
        }
    }
    get onMouseUp(){
        return this._onMouseUp;
    }
    set onMouseMove(func){
        this._onMouseMove = func;
        let x = this.#onMouse.bind(this, "move");
        document.addEventListener('mousemove', x, false); 

        this.#onremove = function(){
            document.removeEventListener("mousemove", x, false);
        }
    }
    get onMouseMove(){
        return this._onMouseMove;
    }
    set onMouseDown(func){
        this._onMouseDown = func;
        let x = this.#onMouse.bind(this, "down");
        let y = this.#onMouse.bind(this, "down");
        document.addEventListener('touchstart', x, false);
        document.addEventListener('mousedown', y, false);

        this.#onremove = function(){
            document.removeEventListener("touchstart", x, false);
            document.removeEventListener("mousedown", y, false);
        }
    }
    get onMouseDown(){
        return this._onMouseDown;
    }
    set onMouseClick(func){
        this._onMouseClick = func;
        let x = this.#onMouse.bind(this, "click");
        document.addEventListener('click', x, false); 

        this.#onremove = function(){
            document.removeEventListener("click", x, false);
        }
    }
    get onMouseClick(){
        return this._onMouseClick;
    }
    setScene(scene){
        this.scene = scene;
    }
    addObject(objectName){
        if(typeof objectName == "string"){
            let object = utils.getObjByKey_Value(this.scene.children, "name", objectName);
            if(object.children.length > 0){
                this.objects.push(object.children[0]);
            } else {
                this.objects.push(object);
            }
        } else {
            this.objects.push(objectName.children[0]);
        }
    }
    remove(){
        for(const e of this.#_list){
            e();
            
        }
    }
    #onMouse(flag, event){
        let clientX = event.clientX;
        let clientY = event.clientY;
        if(event instanceof TouchEvent){
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        }
        if(!this.active){
            return;
        }
        // event.preventDefault();
        const rect = this.inst.canvas.getBoundingClientRect();
        this.pointer.x = ( ( clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
        this.pointer.y = - ( ( clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.inst.camera);
        const intersects = this.raycaster.intersectObjects(this.objects, false);
        // console.log(this.objects);

        if (intersects.length > 0) {
            this.doesHover = true;
            if(flag == "down"){
                this.mouseDownFlag = true;
                this.onMouseDown(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "up"){
                this.mouseDownFlag = false;
                this.onMouseUp(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "move"){
                this.onMouseMove(intersects[0], intersects[0].object.parent.name);
            } else if(flag == "click"){
                this.onMouseClick(intersects[0], intersects[0].object.parent.name, event);
            }
        } else {
            this.doesHover = false;
        }
    }
}