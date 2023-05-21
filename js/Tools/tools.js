
class S_Tools {
  static getUniqueID(digits = 10){
    return Math.floor(Math.random() * Date.now()).toString().slice(0, digits - 1);
  }
  static mergeToArray(array, value){
    if(array.includes(value)){
      return array;
    } else {
      array.push(value);
      return array;
    }
  }
  static srcBase64(src){
    return "Data:image/png;base64," + src;
  }
  
  static base64ToSrc(base64){
    let src = base64.replace("data:image/png;base64,", "");
    return src;
  }  
  static removeFromArray(array, key){
    const index = array.indexOf(key);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
//   static rgb2hsv (r, g, b) {
//     let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
//     rabs = r / 255;
//     gabs = g / 255;
//     babs = b / 255;
//     v = Math.max(rabs, gabs, babs),
//     diff = v - Math.min(rabs, gabs, babs);
//     diffc = c => (v - c) / 6 / diff + 1 / 2;
//     percentRoundFn = num => Math.round(num * 100) / 100;
//     if (diff == 0) {
//         h = s = 0;
//     } else {
//         s = diff / v;
//         rr = diffc(rabs);
//         gg = diffc(gabs);
//         bb = diffc(babs);

//         if (rabs === v) {
//             h = bb - gg;
//         } else if (gabs === v) {
//             h = (1 / 3) + rr - bb;
//         } else if (babs === v) {
//             h = (2 / 3) + gg - rr;
//         }
//         if (h < 0) {
//             h += 1;
//         }else if (h > 1) {
//             h -= 1;
//         }
//     }
//     return {
//         h: Math.round(h * 360),
//         s: percentRoundFn(s * 100),
//         v: percentRoundFn(v * 100)
//     };
//     }
}