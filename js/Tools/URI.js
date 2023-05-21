
class S_URI {
    constructor(){}
    static getOrigin(uri){
        return uri.split('/').slice(0, 3).join('/');
    }
}