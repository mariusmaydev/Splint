console.dir(SPLINT)
class S_IndexedDB {
    static I =  self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB || self.shimIndexedDB;
    static DB;

    static Manager = class Manager {
        constructor(StoreName, enableBuffer = true){
            this.enableBuffer = enableBuffer;
            this.buffer = new Object();
            this.StoreName = StoreName;
        }
        async get(key){
            if(this.enableBuffer && this.buffer[key] != undefined){
                return this.buffer[key];
            }
            let res = await S_IndexedDB.get(key, this.StoreName);
            if(this.enableBuffer && res != undefined){
                this.buffer[key] = res;
            }
            return res;
        }
        async set(key, value){
            if(this.enableBuffer){
                this.buffer[key] = value;
            }
            return S_IndexedDB.set(key, value, this.StoreName);
        }
        async remove(key){
            return S_IndexedDB.remove(key, this.StoreName);
        }
    }
    static StoreName = "Cache";
    static #ready;
    static ReadyState = new Promise(function(resolve){
        this.#ready = resolve;
    }.bind(this));
    static {
        this.ACTIVE = SPLINT.config.main.settings.cacheResources.indexdDB;
        this.#open();
        self.addEventListener("beforeunload", async function(){
            await S_IndexedDB.clearStore("Cache");
        })
    }
    static async #open(){
        let request = indexedDB.open("SPLINT_DB", 1);
            request.onupgradeneeded = function(event){
                this.DB = event.target.result;
                let store1 = this.DB.createObjectStore("Cache");
                    store1.createIndex("key", "key");

                let store2 = this.DB.createObjectStore("DynamicData");
                    store2.createIndex("key", "key");
                    
                let store3 = this.DB.createObjectStore("StaticData");
                    store3.createIndex("key", "key");
            }.bind(this);
            request.onsuccess = function(event){
                this.DB = event.target.result;
                this.#ready(true);
            }.bind(this)
    }
    static async clearStore(StoreName){
        return await new Promise(async function(resolve){
            await this.ReadyState;
            let transaction = this.DB.transaction(StoreName, "readwrite");
            let store = transaction.objectStore(StoreName);

            let request = store.clear();
            request.onsuccess = function(){
                resolve(true);
            }
            request.onerror = function(){
                resolve(false)
            }
        }.bind(this));
    }
    static async get(key, StoreName = this.StoreName){
        return new Promise(async function(resolve){
            if(!this.ACTIVE){
                resolve(undefined);
            }
            await this.ReadyState;
            let transaction = this.DB.transaction(StoreName, "readwrite");
            let store = transaction.objectStore(StoreName);

            let request = store.get(key);
            request.onsuccess = function(){
                if(request.result == undefined){
                    resolve(undefined);
                } else {
                    if(request.result.SPLINT_pack != undefined){
                        request.result.SPLINT.unpack();
                    }
                    resolve(request.result);
                }
            }
            request.onerror = function(){
                resolve(false)
            }
        }.bind(this));
    }
    static async set(key, value, StoreName = this.StoreName){
        return new Promise(async function(resolve){
            if(!this.ACTIVE){
                resolve("unactive");
            }
            await this.ReadyState;
            let transaction = this.DB.transaction(StoreName, "readwrite");
            let store = transaction.objectStore(StoreName);
            try {
                if(typeof value != 'string' && value.constructor != undefined){
                    value.SPLINT.pack();
                }
            } catch {
                
            }
            let request = store.put(value, key);
            request.onsuccess = function(){
                resolve(true);
            }
            request.onerror = function(){
                resolve(false)
            }
        }.bind(this));
    }
    static async remove(key, StoreName = this.StoreName){
        return new Promise(async function(resolve){
            await this.ReadyState;

            let transaction = this.DB.transaction(StoreName, "readwrite");
            let store = transaction.objectStore(StoreName);

            let request = store.delete(key);
            request.onsuccess = function(){
                resolve(true);
            }
            request.onerror = function(){
                resolve(false)
            }
        }.bind(this));
    }
}