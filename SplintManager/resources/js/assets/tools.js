
class PageNavigation {
    static set src(uri){
        if(uri.startsWith("/")){
            uri = uri.slice(1);
        }
        SPLINT.Tools.Location.load.atProjectRoot("/HTML/"+ uri);
    }
}