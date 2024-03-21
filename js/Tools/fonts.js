
        
class S_fonts {
    static loadedFonts = null;
    static #fontWeights = null;
    static {
        // setTimeout(async function(){
        //     S_fonts.preloadFonts.callFromIdle(1000);
        // }, 10000)
        
    }
    static add(name, path, options = {}){
        let font = new FontFace(name, "url(" + SPLINT.projectRootPath + "fonts/" + path + ")", options);
        document.fonts.add(font);
    }
    static async preloadFonts(){
        document.fonts.ready.then(async function(f){
            let all = [...f.values()];
                for(const e of all){
                    e.load();
                }
        })
    }
    static async getLoadedFonts(){
        if(S_fonts.loadedFonts != null){
            return S_fonts.loadedFonts;
        }
        
        let FontStorageOut = [];
        console.dir(document.styleSheets)
        async function load(index){
            let FontStorage = [];
            if(document.styleSheets[index].href == null){
                return FontStorage;
            }
            let h = await SPLINT.Utils.Files.read(document.styleSheets[index].href, true);
            let allIndex = h.allIndexOf("url");
            if(allIndex.length > 1){
                for(const i in allIndex){
                    FontStorage[i] = new Object();
                    let start = allIndex[i]+4;
                    let end = h.indexOf(")", start);
                    let url = h.substring(start, end)
                    if(url[0] == "\""){
                        FontStorage[i].url = SPLINT.projectRootPath + url.substring(7, url.length-1);
                    } else {
                        FontStorage[i].url = url;
                    }
                }
                let allIndex2 = h.allIndexOf("font-family: ");
                let offset2 = 14;
                if(allIndex2.length < 1){
                    allIndex2 = h.allIndexOf("font-family:");
                    offset2 = 13;
                }
                for(const i in allIndex2){
                    let start = allIndex2[i] + offset2;
                    let end = h.indexOf(";", start);
                    let name = h.substring(start, end - 1)
                    if(FontStorage[i] != undefined){
                        FontStorage[i].name = name;
                    }
                }
                let allIndex3 = h.allIndexOf("font-weight: ");
                let offset3 = 13;
                if(allIndex3.length < 1){
                    allIndex3 = h.allIndexOf("font-weight:");
                    offset3 = 12;
                }
                for(const i in allIndex3){
                    let start = allIndex3[i] + offset3;
                    let end = h.indexOf(";", start);
                    let weight = h.substring(start, end)
                    if(FontStorage[i] != undefined){
                        FontStorage[i].weight = weight;
                    }
                }
            }
            return FontStorage;
        }
        for(let i = 0; i < document.styleSheets.length; i++){
            FontStorageOut = FontStorageOut.concat(await load(i));
        }
        S_fonts.loadedFonts = FontStorageOut;
        return FontStorageOut;
    }
    static getNameFromWeight(weight){
        let inText = null;
        switch(weight){
            case 100: inText = "extrem dünn"; break;
            case 200: inText = "extra dünn"; break;
            case 300: inText = "dünn"; break;
            case 400: inText = "normal"; break;
            case 500: inText = "medium"; break;
            case 600: inText = "halb fett"; break;
            case 700: inText = "Fett"; break;
            case 800: inText = "extra Fett"; break;
            case 900: inText = "schwarz"; break;
        }
        return inText;
    }

    static async getFontFace(fontName, fontWeight = null){
        return new Promise(async function(resolve){
            // if(this.#fontWeights == null){
                let fontFace = await document.fonts.ready.then(async function(){
                    // let weights = [];
                    for (const font of document.fonts.values()) {
                        if(font.family == fontName && font.weight == fontWeight){
                            resolve(font);
                            return font;
                        }
                    }
                    return false;
                }.bind(this));
            // } 
            resolve(this.#fontWeights);
        }.bind(this))
      }
  static async getFontWeights(fontName){
    return new Promise(async function(resolve){
        // if(this.#fontWeights == null){
            this.#fontWeights = await document.fonts.ready.then(async function(){
                let weights = [];
                for (const font of document.fonts.values()) {
                    if(font.family == fontName && weights.indexOf(font.weight) == -1){
                        weights.push(font.weight);

                    }
                }
                return weights;
            }.bind(this));
        // } 
        resolve(this.#fontWeights);
    }.bind(this))
  }
}