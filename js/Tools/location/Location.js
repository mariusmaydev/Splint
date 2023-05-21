
class nS_Location {
    static set hash(v){
        window.location.hash = v;
    }
    static get hashes() {
        return window.location.hash
    }
    static addHash(...hash){
        let newHashes = SArray.combine(window.location.hash.split("#"), hash);
        newHashes = SArray.removeValues(newHashes, '');
        window.location.hash = "#" + (newHashes.join('#'));
        this.removeHash();
    }
    static removeHash(...hash){
        let res = SArray.removeValues(window.location.hash.split("#"), [hash, ''].flat());
        window.location.hash = "#" + (res.join('#'));
    }
    static load = class {
        static atProjectRoot(uri){
            if(uri.startsWith("/")){
                uri = uri.slice(1);
            }
            window.location.href = SPLINT.projectRootPath + uri;
        }
    }
}
