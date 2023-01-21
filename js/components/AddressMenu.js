
class AddressMenu {
    constructor(parent, name = ""){
      this.parent = parent;
      this.id     = name + "_AddressMenu_";
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("AddressMenuMain");
      this.newAddressElement = new DOMElement(this.id + "NewAddressMain", "div", this.mainElement);
      this.newAddressElement.Class("NewAddressMain");
      this.data   = login.getData();
      this.drawNewAddress();
      this.drawList();
    }
    drawNewAddress(){
      this.newAddressMain = new drawAddressMenu_NEW(this.mainElement);
      this.newAddressMain.drawSwitch();
      this.newAddressMain.unsetActive();
      this.newAddressMain.onsubmit = function(){
        this.newAddressMain.unsetActive();
        this.drawList();
      }.bind(this);
    }
    drawList(){
      this.listAddressMain = new drawAddressMenu_LIST(this.mainElement);
    }
  }
  
  class drawAddressMenu_NEW {
    constructor(parent, name = "", headline){
      this.parent = parent;	
      this.name   = name;
      this.directSave = true;
      this.drawSubmit = true;
      this.values = AddressObject.getTemplate();
      this.id     = name + "_AddressMenuNew_";
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("addressMenuNewMain");
      if(headline != ""){
        this.headline = new SpanDiv(this.mainElement, "headline", headline);
      }
      this.switch = new switchButton(this.mainElement, "switchNewAddress");
      this.menuElement = new DOMElement(this.id + "menuElement", "div", this.mainElement);
      this.mainElement.Class("addressMenuListMain");
      this.onsubmit = function(){};
      this.draw();
    }
    toggle(){
  
    }
    setActive(){
      this.switch.bindIcon("close");
      this.menuElement.style.display = "block";
    }
    unsetActive(){
      this.switch.bindIcon("add");
      this.menuElement.style.display = "none";
    }
    drawSwitch(){
      this.switch.onactive = function(){
        this.setActive();
      }.bind(this);
      this.switch.onpassive = function(){
        this.unsetActive();
      }.bind(this);
      this.switch.toggle();
    }
    getValues(){
      return this.address_input.getValues();
    }
    setValues(values){
      this.values = values;
    }
    DrawSubmit(flag){
      this.drawSubmit = flag;
      this.draw();
    }
    draw(){
      this.address_input = new addressInput_C(this.menuElement, "input");
      this.address_input.drawSubmit = this.drawSubmit;
      this.address_input.onsubmit = function(values){
        if(this.directSave){
          AddressHelper.add(values);
        }
        this.onsubmit(values);
      }.bind(this);
  
      this.address_input.draw();
      this.address_input.setValues(this.values);
    }
  }
  
  class drawAddressMenu_LIST {
    constructor(parent, name = ""){
      this.parent = parent;
      this.id = name + "_addressMenuList_";
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("addressMenuListMain");
      this.head = new DOMElement(this.id + "head", "div", this.mainElement);
      this.switch = new switchButton(this.head, "switchNewAddress");
      this.listElement = new DOMElement(this.id + "AddressListMain", "div", this.mainElement);
      this.draw();
      this.iconActive   = "close";
      this.iconPassive  = "add";
    }
    setActive(){
      this.switch.bindIcon(this.iconActive);
      this.listElement.style.display = "block";
    }
    unsetActive(){
      this.switch.bindIcon(this.iconPassive);
      this.listElement.style.display = "none";
    }
    drawSwitch(){
      this.switch.onactive = function(){
        this.setActive();
      }.bind(this);
      this.switch.onpassive = function(){
        this.unsetActive();
      }.bind(this);
    }
    draw(){
      let addressData = AddressHelper.get().toObject(true);
      this.listElement.innerHTML = "";
      this.listElement.Class("AddressListMain");
      getHorizontalLine(this.listElement, uniqueID());
      if(addressData == null){
        return;
      }
      for(let i = 0; i < addressData.length; i++){
        let data = addressData[i];
        // let listElement = new DOMElement(this.id + "addressListElement_" + i, "div", this.listElement);
            // getHorizontalLine(this.listElement);
            let AddressElement = new drawAddressElement(this.listElement, data, i);
                let buttonEdit = new Button(AddressElement.buttonDiv, "edit");
                    buttonEdit.bindIcon("edit");
                    buttonEdit.button.onclick = function(){
  
                    }
                let buttonRemove = new Button(AddressElement.buttonDiv, "remove");
                    buttonRemove.bindIcon("delete");
                    buttonRemove.button.onclick = function(){
                      AddressHelper.remove(data.AddressID);
                      this.draw();
                    }.bind(this);
                    getHorizontalLine(this.listElement);
      }
    }
  }
  
  class drawAddressElement{
    constructor(parent, data, index){
      this.data   = data;
      this.id     = "ListElement_" + index + "_";
      this.parent = parent;
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("AddressListElement");
      this.draw();
    }
    draw(){
      let informationDiv = new DOMElement(this.id + "addressListElementInformation_", "div", this.mainElement);
          informationDiv.Class("information");
          let row1 = new DOMElement(this.id + "addressListElement_" + "row1", "div", informationDiv);
              if(this.data.Salutation != undefined && this.data.Salutation != ""){
                let salutation = new spanDiv(row1, "salutation_", getSalutationForCode(this.data.Salutation));
              }
              if(this.data.Title != undefined){
                  let title = new spanDiv(row1, "title_", this.data.Title);
              }
                
              let firstName = new spanDiv(row1, "firstName_", this.data.FirstName);
              let lastName = new spanDiv(row1, "lastName_", this.data.LastName);
  
          let row2 = new DOMElement(this.id + "addressListElement_" + "row2", "div", informationDiv);
              let street = new spanDiv(row2, "street_", this.data.Street);
              let housenumber = new spanDiv(row2, "housenumber_", this.data.HouseNumber);
  
          let row3 = new DOMElement(this.id + "addressListElement_" + "row3", "div", informationDiv);
              let city = new spanDiv(row3, "city_", this.data.City);
              let postcode = new spanDiv(row3, "postcode_", this.data.Postcode);
  
          let row4 = new DOMElement(this.id + "addressListElement_" + "row4", "div", informationDiv);
              let country = new spanDiv(row4, "country_", getCountryForCode(this.data.Country));
  
      let contactTable = new table(this.mainElement, "contactTable_");
          if(this.data.Email != undefined){
            contactTable.addRow("Emailadresse:", this.data.Email);
          }
          if(this.data.Phone != undefined){
            contactTable.addRow("Telefonnummer:", this.data.Phone);
          }
          contactTable.draw();
  
      this.buttonDiv = new DOMElement(this.id + "_buttonDiv_", "div", this.mainElement);
      this.buttonDiv.Class("buttonsDiv");
    }
  }

  class addressInput_C {
    constructor(parent, name){
      this.parent = parent;
      this.name = name;
      this.id = name + "_addressInput_";
      this.data = [];
      this.onsubmit = function(){};
      this.expanded = true;
      this.drawSubmit = true;
      this.mainElement = new DOMElement(this.id + "main", "div", parent);
      this.mainElement.Class("AddressInput");
      this.draw();
    }
    draw(){
      this.mainElement.innerHTML = "";
      // this.input_name = new InputDiv(this.mainElement, "name", "Name der Addresse");
  
      this.dropdown_salutation = new dropdownInput(this.mainElement, "salutation", "Anrede");
      this.dropdown_salutation.div.Class("dropdown_salutation");
      this.dropdown_salutation.addOption("Mr", "Herr");
      this.dropdown_salutation.addOption("Mrs", "Frau");
      this.dropdown_salutation.addOption("Mx", "Divers");
  
      this.title_input = new InputDiv_S(this.mainElement, "title", "Titel");
      this.title_input.div.Class("title_input");
  
      this.firstName_input = new InputDiv_S(this.mainElement, "firstName", "Vorname");
      this.firstName_input.div.Class("firstName_input");
  
      this.lastName_input = new InputDiv_S(this.mainElement, "lastName", "Nachname");
      this.lastName_input.div.Class("lastName_input");
      
      this.postcode_input = new InputDiv_S(this.mainElement, "postcode", "Postleitzahl");
      this.postcode_input.div.Class("postcode_input");
      
      this.city_input = new InputDiv_S(this.mainElement, "city", "Stadt");
      this.city_input.div.Class("city_input");
  
      this.dropdown_country = new dropdownInput(this.mainElement, "country", "Land");
      this.dropdown_country.div.Class("dropdown_country");
      this.dropdown_country.addOption("DE", "Deutschland");
      this.dropdown_country.addOption("AU", "Österreich");
  
      this.street_input = new InputDiv_S(this.mainElement, "street", "Straße");
      this.street_input.div.Class("street_input");
  
      this.housenumber_input = new InputDiv_S(this.mainElement, "housenumber", "Haunummer");
      this.housenumber_input.div.Class("housenumber_input");
  
      if(this.expanded){
        this.email_input = new InputDiv_S(this.mainElement, "email", "Emailadresse");
    
        this.phone_input = new InputDiv_S(this.mainElement, "phone", "Telefonnummer");
      }
      if(this.drawSubmit){
        this.buttonsDiv = new DOMElement(this.id + "buttons", "div", this.mainElement);
          let button_save = new Button(this.buttonsDiv, "save", "speichern");
              button_save.button.onclick = function(){
                this.onsubmit(this.getValues());
              }.bind(this);
  
      }
    }
    setValues(data){
      if(data != null){
        this.title_input.value = data.Title;
        this.dropdown_salutation.value = data.Salutation;
        this.firstName_input.value = data.FirstName;
        this.lastName_input.value = data.LastName;
        this.postcode_input.value = data.Postcode;
        this.city_input.value = data.City;
        this.dropdown_country.value = data.Country;
        this.street_input.value = data.Street;
        this.housenumber_input.value = data.HouseNumber;
        if(this.expanded){
          this.email_input.value = data.Email;
          this.phone_input.value = data.Phone;
        }
      }
    }
    getValues(){
      let obj = new Object();
          obj.Title       = this.title_input.value;
          obj.FirstName   = this.firstName_input.value;
          obj.LastName    = this.lastName_input.value;
          obj.Street      = this.street_input.value;
          obj.Country     = this.dropdown_country.getValue();
          obj.City        = this.city_input.value;
          obj.Postcode    = this.postcode_input.value;
          obj.HouseNumber = this.housenumber_input.value;
          obj.Salutation  = this.dropdown_salutation.value;
          if(this.expanded){
            obj.Email       = this.email_input.value;
            obj.Phone       = this.phone_input.value;
          } else {
            obj.Email = "";
            obj.Phone = "";
          }
      return obj;
    }
  }
  

  class AddressObject {
    constructor(){
      this.AddressID    = "";
      this.AddressName  = "";
      this.Country      = "DE";
      this.City         = "";
      this.Postcode     = "";
      this.Street       = "";
      this.HouseNumber  = "";
      this.FirstName    = "";
      this.LastName     = "";
      this.Title        = "";
      this.Email        = "";
      this.Phone        = "";
      this.Salutation   = "";
      return this;
    }
    static getTemplate(){
      let inst = new AddressObject();
      return inst.get();
    }
    get(){
      let Storage = new Object();
          Storage.AddressID   = this.AddressID;
          Storage.AddressName = this.AddressName;
          Storage.Country     = this.Country;
          Storage.City        = this.City;
          Storage.Postcode    = this.Postcode;
          Storage.Street      = this.Street;
          Storage.HouseNumber = this.HouseNumber;
          Storage.FirstName   = this.FirstName;
          Storage.LastName    = this.LastName;
          Storage.Title       = this.Title;
          Storage.Phone       = this.Phone;
          Storage.Email       = this.Email;
          Storage.Salutation  = this.Salutation;
      return Storage;
    }
  }