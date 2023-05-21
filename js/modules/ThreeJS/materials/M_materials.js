import CHROME from './metal/chrome.js';
import MaterialHelper from './MaterialHelper.js';

const S_MATERIAL_LIST = new Object();

export { S_MATERIAL_LIST };

export default class S_materials {

    static get materialHelper (){
        return MaterialHelper;
    }
    static get LIST(){
        return S_MATERIAL_LIST;
    }
    static get chrome(){
        return CHROME.light;
    }
}