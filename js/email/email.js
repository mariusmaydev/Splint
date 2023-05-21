
const EMAIL_S = new Object();

class email_S {
    static PATH = SPLINT.PATHS.php.email;
    static #call(data){
        data.login = EMAIL_S.login;
        return CallPHP_S.call(this.PATH, data);
    }

    static save_by_index(start = 0, amount = 10){
        let data = CallPHP_S.getCallObject("SAVE_BY_INDEX");
            data.index = new Object();
            data.index.start  = start;
            data.index.amount = amount;
        return this.#call(data).toObject(true);
    }
    
    /**
     * set current login data
     *
     * @param {Object}  login             login Object
     * @param {string}  login.server      imap server
     * @param {int}     login.port        imap port
     * @param {string}  login.email       email address
     * @param {string}  login.password    password
     *
     * @return  {void}         
     */
    static setLogin(login){
        EMAIL_S.login = login;
    }

    /**
     * set login to null
     *
     * @return  {void}
     */
    static clearLogin(){
        EMAIL_S.login = null;
    }

    /**
     * check if login is set
     *
     * @return  {bool}
     */
    static isLoggedIn(){
        if(EMAIL_S.login != undefined && EMAIL_S.login != null){
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {int} start       count from last email 
     * @param {int} [amount]    amount of emails
     * @returns {array}         array of emails 
     */
    static get_by_index(start, amount = 1){
      let data = CallPHP_S.getCallObject("GET_BY_INDEX");
          data.index = new Object();
          data.index.start  = start;
          data.index.amount = amount;
      return this.#call(data).toObject(true);
    }
    /**
     * @param {int} UID         unique ID of email
     * @returns {object}        email as object
     */
    static get_by_UID(UID){
      let data = CallPHP_S.getCallObject("GET_BY_UID");
          data.UID = UID;
      return this.#call(data).toObject(true);
    }

    /**
     * @param {int} start       count from last email 
     * @param {int} [amount]    amount of emails
     * @returns {array}         array of emails 
     */
    static getHeader(start, amount = 1){
      let data = CallPHP_S.getCallObject("GET_HEADER_BY_INDEX");
          data.index = new Object();
          data.index.start  = start;
          data.index.amount = amount;
      return this.#call(data).toObject(true);
    }

    static getHeaderByUID(UID){
      let data = CallPHP_S.getCallObject("GET_HEADER_BY_UID");
          data.UID = UID;
      return this.#call(data).toObject(true);
    }

    /** 
     * @param {emailFilterObj_S} filterObj   - filter information
     * @returns {object} array of emails 
     */
    static filter(filterObj){
        let data = CallPHP_S.getCallObject("FILTER");
            data.query = filterObj.parse();
        return this.#call(data).toObject(true);
    }

    static remove(...numbers){
        let data = CallPHP_S.getCallObject("REMOVE_MAIL");
            data.mailNumbers = numbers;
        return this.#call(data).toObject(true);
    }
    static remove_by_UID(UID){
        let data = CallPHP_S.getCallObject("REMOVE_MAIL_UID");
            data.UID = UID;
        return this.#call(data).toObject(true);
    }
}