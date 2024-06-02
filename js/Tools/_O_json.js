
//   class S_JSON {
//     /**
//      * @deprecated
//      * @param {string} string 
//      * @returns 
//      */
//     static parseIf(string){
//       try {
//         return JSON.parse(string);
//       } catch(e){
//         return string;
//       }
//     }
//     static escapeHTML(str){
//       let tagsToReplace = {
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;'
//       };
//       return str.replace(/[&<>]/g, function(tag){
//         return tagsToReplace[tag] || tag;
//       });
//     }
//   }