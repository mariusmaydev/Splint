class MATH {
    static multiply(v1, v2){
      return Math.round(v1 * v2 * 100) / 100;
    }
    static divide(v1, v2){
      return ((v1 * 100) / (v2 * 100));
    }
    static add(v1, v2){
      return Math.round(v1 * 100 + v2 * 100) / 100;
    }
    static pytagoras(x, y){
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    static sin(deg){
      return Math.sin(this.toRadians(deg));
    }
    static cos(deg){
      return Math.cos(this.toRadians(deg));
    }
    static tan(deg){
      return Math.tan(this.toRadians(deg));
    }
    static getNewSize(offsetX, offsetY, heightBase, widthBase, align = 0){
      let f1 = widthBase + heightBase;
      let f2 = offsetX + offsetY;
      let f3 = f1 + f2;
      if(f1 == 0){
        f1 = 1;
      }
      let f4 = f3 / f1;
      return {width: widthBase * f4, height : heightBase * f4};
    }
    static positiveOrNUll(value){
      if(value < 0){
        return 0;
      }
      return value;
    }
    static getIndex(indexIn, step, size){
      let a = 0;
      if(step != 0){
        a = (size * step) -1;
      }
      let index = indexIn - (step * (size));
      return index;
    }
    static toDegrees(angle) {
      return this.multiply(angle, (180 / Math.PI));
    }  
    static toRadians(angle) {
      return this.multiply(angle, (Math.PI / 180));
    }

  }

  class MATH_convert {
    static pt2px(pt){
      return MATH.multiply(pt, 1.333333);
    }
    static px2pt(px){
      return MATH.divide(px, 1.333333);
    }
    static pt2mm(pt){
      return MATH.multiply(pt, 0.352777);
    }
    static px2mm(px){
      return MATH.multiply(px, 0.264583);
    }
    static mm2px(mm){
      return MATH.multiply(mm, 3.779527);
    }
    static mm2pt(mm){
      return MATH.multiply(mm, 2.834645);
    }

  }