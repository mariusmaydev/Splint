class S_Math {
    static trimDecimals(number, digits){
        let multiplier = Math.pow(10, digits);
        let adjustedNum = number * multiplier;
        let truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    
        return truncatedNum / multiplier;
    }
    static roundFX(number, digits = 2, up = true){
        let f = number * (Math.pow(10, digits));
        if(up){
            return Math.ceil(f) / (Math.pow(10, digits));
        } else {
            return Math.floor(f) / (Math.pow(10, digits));
        }
    }
    static multiply(v1, v2, autoPrecision = false){
        let expo = 100;
        if(autoPrecision){
            expo = this.#getPrecisionScale(v1, v2);
        }
      return Math.round(v1 * v2 * expo) / expo;
    }
    static divide(v1, v2, autoPrecision = false){
        let expo = 100;
        if(autoPrecision){
            expo = this.#getPrecisionScale(v1, v2);
        }
      return ((v1 * expo) / (v2 * expo));
    }
    static add(v1, v2, autoPrecision = false){
        let expo = 100;
        if(autoPrecision){
            expo = this.#getPrecisionScale(v1, v2);
        }
      return Math.round(v1 * expo + v2 * expo) / expo;
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
        const ratio = (180 / Math.PI);
        return this.multiply(angle, ratio);
    }  
    static toRadians(angle) {
        const ratio = (Math.PI / 180);
        return this.multiply(angle, ratio);
    }
    static countDecimals(number) {
        if(Math.floor(number) === number){
            return 0;
        }
        return number.toString().split(".")[1].length || 0; 
    }
    static getMaxDecimals(...numbers){
        let res = 0;
        for(const e of numbers){
            let n = this.countDecimals(e);
            if(n > res){
                res = n;
            }
        }
        return res;
    }
    static #getPrecisionScale(...numbers){
        return Math.pow(10, this.getMaxDecimals(...numbers));
    }
  }

  class MATH_convert {
    static pt2px(pt){
      return S_Math.multiply(pt, 1.333333);
    }
    static px2pt(px){
      return S_Math.divide(px, 1.333333);
    }
    static pt2mm(pt){
      return S_Math.multiply(pt, 0.352777);
    }
    static px2mm(px){
      return S_Math.multiply(px, 0.264583);
    }
    static mm2px(mm){
      return S_Math.multiply(mm, 3.779527);
    }
    static mm2pt(mm){
      return S_Math.multiply(mm, 2.834645);
    }

  }