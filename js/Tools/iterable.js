
class S_Iterator {
    constructor(step = 1, min = 0, max = Infinity){
        this.max    = max;
        this.step   = step;
        this.min    = min;
        this.iterable = this.#func_iter();
    }
    #index;
    next(){
        let n = this.iterable.next();
        if(this.max == Infinity || this.min == -Infinity){
            return n.value;
        } else {
            return n;
        }
    }
    *#func_iter() {
        this.#index = this.min;
        while (this.#index < this.max && this.#index >= this.min) {
            yield this.#index;
            this.#index += this.step;
        }
    }
    reset(){
        this.iterable = this.#func_iter();
    }
    set(value = 0){
        this.#index = value;
    }
}
// // // 
//         let obj = new Object();
//         obj.a = "a";
//         obj.b = "g";
// //   const iterator = new S_Iterator(obj);

//   let iterator = new S_Iterator(2);
//     // iterator.
  
//   // Expected output: 0
  
//   console.log(iterator.next());
//   console.log(iterator.next());
//   console.log(iterator.next());
//   iterator.reset();
//   console.log(iterator.next());
//   console.log(iterator.next());
//   console.log(iterator.next());
//   // Expected output: 1
  