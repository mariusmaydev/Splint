

class IndexedDB {
    constructor(DBName){
      this.DBName = DBName;
      this.StorageName = "test12";
      this.db = null;
      this.state = [
        {
          title: "Einkaufen gehen2",
          person: "Max2",
          message: "Für das Wochenende einkaufen gehen2",
        },
        {
          title: "Wohnung putzen",
          person: "Anna",
          message: "Küche und Kinderzimmer müssen aufgeräumt werden",
        },
        {
          title: "Müll raus bringen",
          person: "Max",
          message: "Jeden zweiten Tag muss mal der ganze Müll raus",
        },
      ];
      this.#open();
      this.#eventHandler();
    }
    addStorage(StorageName){
      this.db = null;
      this.request = null;
      this.StorageName = StorageName;
      this.#open(4);
      this.#eventHandler();
    }
    addDataSet(){
      this.#newDataSet();
    }
    removeDataSet(){

    }
    #open(version){
      this.request = window.indexedDB.open(this.DBName, version);
      console.log(this.request);
    }
    #eventHandler(){
      this.request.addEventListener("upgradeneeded", this.#upgradeNeeded.bind(this));
      this.request.addEventListener("success", this.#success.bind(this));
      this.request.addEventListener("error", this.#error.bind(this));
    }
      #success(event){
        console.log("Success");
        this.db = event.target.result;
      
        if (typeof this.state !== "undefined") {
          let notes = this.#transaction(this.StorageName, "readwrite", function() {
            // viewNoteList();
          });
          let request = notes.getAll();
          request.addEventListener("success", function(event) {
            console.log("success2");
            if (event.target.result.length === 0) {
              this.state.forEach((data) => {
                data.date = Date.now();
                let addRequest = notes.add(data);
                addRequest.addEventListener("success", (event) => {
                  console.log("added data");
                  
                });
              });
            }
          }.bind(this));
        } else {
        }
        this.db.close();
      }
      #error(event){
        console.log(event.target.error);
      }
      #upgradeNeeded(event){
        console.log(event.oldVersion + " to " + event.newVersion);
        this.db = event.target.result;

        console.log(this.db.objectStoreNames);
        this.#newStorage();
        //db.createObjectStore("test1234");
        if (this.db.objectStoreNames.contains("test1234")) {
          this.db.deleteObjectStore("test1234");
        }
      }
    #transaction(storeName, mode, callback = null) {
      let transaction = this.db.transaction(storeName, mode);
      transaction.addEventListener("error", (event) => {
        console.log(event.target.error);
      });
      transaction.addEventListener("complete", (event) => {
        console.log(event)
        console.log("Transaction Complete");
        if (typeof callback === "function") callback();
      });
    
      return transaction.objectStore(storeName);
    }
    getAllStorages(){

    }
    getStorage(){

    }
    #newDataSet(){
      
        let newNote = {
          title: "sdafasdf",
          person: "sadfasdfs",
          message: "sadfasdf",
          date: Date.now(),
        };
      
        let notes = this.#transaction(this.StorageName, "readwrite");
      
        let request = notes.add(newNote);
        request.addEventListener("success", (event) => {
          console.log(event.target.result);
          // document.querySelector("#myForm").reset();
          // viewNoteList();
        });
        request.addEventListener("error", (event) => {
          console.log(event.target.error);
        });
    }
    removeStorage(){

    }
    updateStorage(){

    }
    #newStorage(){
      if (!this.db.objectStoreNames.contains(this.StorageName)) {
        let objectStore = this.db.createObjectStore(this.StorageName, {
          keyPath: "id",
          autoIncrement: true,
        });
    
        objectStore.createIndex("titleIDX", "title", { unique: false });
        objectStore.createIndex("personIDX", "person", { unique: false });
        objectStore.createIndex("dateIDX", "date", { unique: false });
      }
    }
  }