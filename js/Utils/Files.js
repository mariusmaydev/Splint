/**
 * @class
 * */
class S_FileUtils {
    // static loadFromRoot(uri){
    //     return new parseOutput(this.read(location.origin + "/" + uri));
    // }
    // static loadFromProject(uri){
    //     return new parseOutput(this.read(SPLINT.URIs.project + uri));
    // }

    /**
     * desc
     * @date 2023-06-12
     * @param { * } urlToFile
     * @param { * } parm2
     */
    static async doesExist(urlToFile, sync = false) {
        return new Promise(function(resolve){
            let xhr = new XMLHttpRequest();
                xhr.open('HEAD', urlToFile, !sync);
                xhr.send();
             
            if (xhr.status == "404") {
                resolve(false);
                return false;
            } else {
                resolve(true);
                return true;
            }
        });
    }
    /**
     * desc
     * @date 2023-06-12
     * @param { * } uri
     * @param { * } parm2
     */
    static read(uri, sync = false, responseType = ""){
        if(sync){
            // if(!this.doesExist(uri, true)){
            //     return false;
            // }
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", uri, false);
            rawFile.onreadystatechange = function() {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0){
                        return rawFile.responseText;
                    } else {
                        return false;
                    }
                }
            }
            rawFile.send(null);
            return rawFile.responseText;
        } else {
            return new Promise(async function(resolve){
                // if(!(await S_FileUtils.doesExist(uri, false))){
                //     resolve(false);
                //     return false;
                // }
                let rawFile = new XMLHttpRequest();
                rawFile.responseType =responseType
                rawFile.open("GET", uri, true);
                rawFile.onreadystatechange = function() {
                    if(rawFile.readyState === 4) {
                        console.dir(rawFile)
                        if(rawFile.status === 200 || rawFile.status == 0){
                            resolve(rawFile.responseText);
                        } else {
                            resolve(false);
                        }
                    }
                }
                rawFile.send(null);
            });
        }
    }
    /**
     * desc
     * @date 2023-06-12
     * @param { * } data
     * @param { * } uri
     */
    static write(data, uri){
        return new Promise(async function(resolve){
            let rawFile = new XMLHttpRequest();
            rawFile.open("POST", uri, true);
            rawFile.setRequestHeader('Content-type', 'application/json');
            rawFile.onreadystatechange = function() {
                console.dir(rawFile)
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0){
                        resolve(rawFile.responseText);
                    } else {
                        resolve(false);
                    }
                }
            }
            rawFile.send(JSON.stringify(data));
        });
    }
    /**
     * desc
     * @date 2023-06-12
     * @param { * } parm1
     */
    static #parseOutput(flag = false){            
        if(typeof this.value == "string"){
            try {
                if(flag){
                    return JSON.parse(this.value);
                } else {
                        return JSON.parse(this.value, function(k, v) { 
                    if(!isNaN(v) && typeof v != 'boolean'){
                        return parseInt(v, 10);
                    } 
                        return v;
                    });
                }
            } catch {
                return this.value;
            }
        }
    }
}