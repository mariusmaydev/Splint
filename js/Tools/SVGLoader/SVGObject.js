
class SVG_Object_S {
    constructor(name, path, color = null){
      this.name = name;
      this.path = path;
      this.color = color;
      this.src = new Image();
      this.load();
    }
    load(){
      let img = new Image();
          img.src = this.path;
          if(this.color != null){
            img.onload = function(){
              let canvas = document.createElement("canvas");
                  canvas.width  = Math.abs(img.width);
                  canvas.height = Math.abs(img.height);
              let ctx = canvas.getContext('2d');
                  ctx.imageSmoothingEnabled = true;
                  ctx.imageSmoothingQuality = "high";
                  ctx.drawImage(img, 0, 0, Math.abs(img.width), Math.abs(img.height));
                  ctx.globalCompositeOperation = "source-in";
                  ctx.fillStyle = this.color;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.globalCompositeOperation = "source-over";
              this.src.src = canvas.toDataURL('image/png', 1);
        
              canvas.remove();
            }.bind(this);
          } else {
            this.src.src = img.src;
          }
    }
  }