
import { Clock } from "@THREE_SRC/core/Clock.js"//"@THREE_ROOT_DIR/src/core/Clock.js";
// import { Clock } from "three";

// export default class Animations {
//     static get Mixer(){
//         return Mixer;
//     }
//     static get FX(){
//         return FX;
//     }
//     static get Animation(){
//         return Animation;
//     }
// }
export class Mixer {
    constructor(instance){
        this.animations = [];
        this.activeAnimations = [];
        this.instance = instance;
        this.isOneActive = false;
        this.FrameID = null;
        this.animationTime = 0;
        this.tickIndex = 0;
        this.cancle = false;
    }
    checkActive(){
        this.isOneActive = false;
        for(const animation of this.animations){
            if(animation.active){
                // animation.stop();
                this.isOneActive = true;
            }
        }
    }
    stop(){
        this.isOneActive = false;
        for(const animation of this.animations){
            if(animation.active){
                // animation.stop();
                this.isOneActive = true;
            }
        }
        // this.animations = [];
        // this.activeAnimations = [];
        // cancelAnimationFrame(this.FrameID);
        // this.cancle = true;
    }
    add(animation){
        this.animations.push(animation);
    }
    tick(FrameID = null){
        if(this.cancle){
            return;
        }
        if(FrameID != null){
            this.FrameID = FrameID;
        }
            for(const animation of this.animations){
                if(animation.active){
                    animation.tick();
                    this.isOneActive = true;
                }
            }
            if(this.isOneActive){
                // this.checkActive();
                // console.dir(this.animations)
                // this.instance.animate();
            }
            // this.isOneActive = false;
            
        
    }

}

export class Animation {
    constructor(model, duration, mixer) {
        this.mixer = mixer;
        this.duration = duration;
        this.clock = new Clock(false);
        this.progress = 0;
        this.model = model;
        this.groupe = null;
        this.active = false;
        this._forward = true;
        this.onStop     = function(){};
        this.onTick     = function(){};
        this.onStart    = function(){};
    }
    pause(){
        
    }
    start(forward = true, duration = this.duration, name, isInfinity = false, ...args){
        this.name = name;
        this.args = args;
        this.isInfinity = isInfinity;
        this._duration = duration;
        this.forward = forward;
        this.active = true;
        this.groupe = this.onStart(this.model, name, this);
        this.clock.start();
        this.mixer.tick();
    }
    stop(name = this.name){
        cancelAnimationFrame(this.mixer.FrameID)
        this.active = false;
        this.mixer.stop();
        this.onStop(this.progress, name, this.groupe, this.args);
        this.clock.stop();
        // let index = this.mixer.activeAnimations.indexOf(this);
    }
    set forward(v){
        this._forward = v;
    }
    get forward(){
        return this._forward;
    }
    tick(){
        if(!this.active){
            return;
        }
        this.onTick(this.model, this.progress, this.groupe, ...this.args);
        if(this.forward){
            this.progress = 100 / this._duration * this.clock.getElapsedTime();
            if(this.progress >= 100){
                this.onTick(this.model, 100, this.groupe, ...this.args);
                this.stop();
                if(this.isInfinity){
                    this.start(!this.forward, this._duration, this.name, this.isInfinity);
                }
            }
        } else { 
            this.progress = 100 - (100 / this._duration * this.clock.getElapsedTime());
            if(this.progress <= 0){
                this.onTick(this.model, 0, this.groupe, ...this.args);
                this.stop();
                if(this.isInfinity){
                    this.start(!this.forward, this._duration, this.name, this.isInfinity);
                }
            }
        }
    }
}

export class FX {
    static linear_lever(progress, open = true){

        let v = (360/100);
        if(open){
            if(progress > (v*30)){
                return (progress-(v*30))*(v*0.4);
            } else {
                return 0;
            }
        } else {
            if(progress > (v*30)){
                return (progress-(v*30))*(v*0.4);
            } else {
                return 0;
            }
        }
    }  
    static ease(progress, multiply = 1, type = "in"){

        if(type == "in"){
            let a = progress;
            return a * Math.pow(a / 100, multiply);
        } else if(type == "out"){
            let a = 100 - progress;
            return 100 - a * Math.pow(a / 100, multiply);
        } else if(type == "in-out"){
            if(progress <= 50){
                let a = progress;
                return a * Math.pow(a / 50, multiply);
            } else {
                let a = 100 - progress;
                return 100 - a * Math.pow(a / 50, multiply);
            }
        }
    }
    static linear(progress){
        return progress;
    } 
    static test(progress, invert = false){
        let a = 0;
        if(invert){
            a = Math.pow(360, (1/360*progress)); 
        } else {
            a = Math.pow(1/360, (1/360*progress))*360; 
        }
        console.log(a)
        return a;
    }  

    static easeOutBounce(progress, min, max, step) {
        let count   = progress;

        if ((count /= step) < (1 / 2.75)) {
            return max * (7.5625 * count * count) + min;
        } else if (count < (2 / 2.75)) {
            return max * (7.5625 * (count -= (1.5 / 2.75)) * count + 0.75) + min;
        } else if (count < (2.5 / 2.75)) {
            return max * (7.5625 * (count -= (2.25 / 2.75)) * count + 0.9375) + min;
        } else {
            return max * (7.5625 * (count -= (2.625 / 2.75)) * count + 0.984375) + min;
        }
    };
}