
export default class TextureCache {
    static Cache = new Object();
    static cacheTexture(texture, name){
        this.Cache[name] = texture;
    }
    static getTexture(name, fallbackTexture = null){
        if(this.Cache[name] === undefined){
            if(fallbackTexture == null){
                return false;
            }
            return fallbackTexture;
        } else {
            return this.Cache[name];
        }
    }
    static getTextureCloned(name, fallbackTexture = null){
        let texture = this.getTexture(name, fallbackTexture);
        if(texture == false) {
            return false;
        }
        return texture.clone();
    }
}