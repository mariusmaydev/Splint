import SPLINT from 'SPLINT';

export default class File {
    static loadFromRoot(uri){
        return new parseOutput(this.read(location.origin + "/" + uri));
    }
    static loadFromProject(uri){
        return new parseOutput(this.read(SPLINT.URIs.project + uri));
    }
    static read(uri){
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", uri, false);
        rawFile.onreadystatechange = function() {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0){
                    return rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        return rawFile.responseText;
    }
}

class parseOutput{
    constructor(value){
        this.value = value;
    }
    toObject(flag = false){            
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
    get text(){
        return this.value;
    }
}