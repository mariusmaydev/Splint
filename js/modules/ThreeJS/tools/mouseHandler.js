
export default class MouseHandler3D {
  constructor(parent){
    this.active = true;
    this.parent = parent;
    this.dX = 0;
    this.dY = 0;
    this.lX = 0;
    this.lY = 0;
    this.blocked = false;
    this.mouseDown = false;
    this.#onMove();
    this.#onMouseDown();
    this.#onMouseUp();

    this.#onTouchMove();
    this.#onTouchDown();
    this.#onTouchEnd();
    this.onMove = function(){};
  }
  block(){
    this.blocked = true;
  }
  unblock(){
    this.blocked = false;
  }
  #onTouchDown(){
    this.parent.addEventListener("touchstart", function(event){
      this.mouseDown = true;
    }.bind(this), false);
  }
  #onMouseDown(){
    this.parent.addEventListener("mousedown", function(event){
      this.mouseDown = true;
    }.bind(this), false);
  }
  #onTouchEnd(){
    this.parent.addEventListener("touchend", function(event){
      this.mouseDown = false;
      this.lY = 0;
      this.lX = 0;
    }.bind(this), false);
  }
  #onMouseUp(){
    this.parent.addEventListener("mouseup", function(event){
      this.mouseDown = false;
    }.bind(this), false);
  }
  #onMove(){
    this.parent.addEventListener("mousemove", function(event){
        if(!this.active){
            return;
        }
      let offset = $("#" + this.parent.id).offset();
      this.X = event.pageX - (offset.left);
      this.Y = event.pageY - (offset.top);
      this.dY = this.lY - this.Y; 
      this.dX = this.lX - this.X; 
      this.lX = this.X;
      this.lY = this.Y;
      this.onMove(event, this.blocked);
    }.bind(this), false);
  }
  #onTouchMove(){
    this.parent.addEventListener("touchmove", function(event){
        if(!this.active){
            return;
        }
      let offset = $("#" + this.parent.id).offset();
      if(event.targetTouches.length > 1){
        return;
      } 
      this.X = event.targetTouches[0].pageX - (offset.left);
      this.Y = event.targetTouches[0].pageY - (offset.top);
      this.dY = this.lY - this.Y; 
      this.dX = this.lX - this.X; 
      if(this.lY != 0){
        this.onMove(event, this.blocked);

      }
      this.lX = this.X;
      this.lY = this.Y;
    }.bind(this), false);
  }
}