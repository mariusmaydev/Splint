
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
  
  
    static get download(){
        SPLINT.getClass("download_S", "download");
        return download_S;
    }
    static get CSV(){
        SPLINT.getClass("CSV_S", "csv");
        return CSV_S;
    }
    static get Fonts(){
        SPLINT.getClass("S_fonts", "fonts");
        return S_fonts;
    }
    static get CanvasTools(){
        SPLINT.getClass("S_CanvasTools", "CanvasTools");
        return S_CanvasTools;
    }
    static get Location(){
        SPLINT.getClass("nS_Location", "Location");
        return nS_Location;
    }
    static get Location_old(){
        SPLINT.getClass("old_Location", "old_Location");
        return old_Location;
    }
    static get parse(){
        SPLINT.getClass("S_Tparser", "parser");
        return S_Tparser;
    }
    static get CursorHandler(){
        SPLINT.getClass("CursorHandler_S", "cursorHandler");
        return CursorHandler_S;
    }
    static get DateTime(){
        SPLINT.getClass("S_DateTime", "DateTime");
        return S_DateTime;
    }
    static get Time(){
        SPLINT.getClass("S_DateTime", "DateTime");
        return S_DateTime;
    }
    static get ObjectTools(){
        SPLINT.getClass("S_ObjectTools", "objects");
        return S_ObjectTools;
    }
    static get Math(){
        SPLINT.getClass("S_Math", "math");
        return S_Math;
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