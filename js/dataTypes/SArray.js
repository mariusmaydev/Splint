
class SArray extends Array {
    static {
        this.removeValues = function(array, value){
            return this.prototype.removeValues.call(array, value);
        }
        this.assort = function(array, divider = '/', up = true){
            return this.prototype.assort.call(array, divider, up);
        }
        this.assortInt = function(array, key = null, up = true){
            return this.prototype.assortInt.call(array, key, up);
        }
        this.combine = function(array1, array2){
            return this.prototype.combine.call(array1, array2);
        }
        this.unique = function(array){
            return this.prototype.unique.call(array);
        }
    }
    static get [Symbol.species]() {
      return Array;
    }

    #onPush = function(...items){};
    constructor(...array){
        super(...array)
        this.length = array.length;
    }
    // static to
    set onPush(func){
        this.#onPush = func;
    }
    get onPush(){
        return this.#onPush;
    }
    push(...items){
        this.onPush(...items);
        return super.push(...items);
    }
    assortInt(key, up = true){
        this.sort(function (a, b) {
            if(up){
                if(a[key] > b[key]){    
                    return 1;
                }
                if(a[key] < b[key]){
                    return -1;
                }
            } else {
                if(a[key] < b[key]){    
                    return 1;
                }
                if(a[key] > b[key]){
                    return -1;
                }
            }
          return 0;
        });
        return this;
    }
    assort(divider = '/', up = true) {
        this.sort(function (a, b) {
            let la = a.split(divider).length;
            let lb = b.split(divider).length;
            if(up){
                return la - lb;
            }
            return lb - la;
          });
          return this;
    }
    combine(array){
        return SArray.unique([...this, ...array]);
    }
    unique(){
        return this.filter(function(item, pos) {
            return this.indexOf(item) == pos;
        }.bind(this), SArray);
    }
    removeValues(values) {
        return this.filter.call(this, function(e) { return !values.includes(e); });
    }
}