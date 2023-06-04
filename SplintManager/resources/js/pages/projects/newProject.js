
class P_createProject extends templateExtendedPage {
    constructor(parent){
        super("createProject", parent);
        // this.addData("Projects", "/projects/index.html");
        // this.selectHash();
        // window.addEventListener("hashchange", this.selectHash.bind(this));
        this.data = new Object();
        this.draw();
    }
    async getData(){
        this.data.pathABS = (await SPLINT.CallPHP.AccessSplint("SPLINT.GET_VAR").send()).rootpath;
        return this.data;
    }
    async draw(){
        super.draw();
        await this.getData();
        let nameContainer = new SPLINT.DOMElement(this.id + "nameContainer", "div", this.rightContent);
            let nameInput = new SPLINT.DOMElement.InputDiv(nameContainer, "projectName", "project name");
            let pathOutput = new SPLINT.DOMElement.SpanDiv(nameContainer, "output", "");
            
                nameInput.oninput = function(e){
                    pathOutput.value = this.data.pathABS + "\\" + nameInput.value;
                }.bind(this);

            let sw_cIndexHTML_container = new SPLINT.DOMElement(null, "div", this.rightContent);
                let sw_cIndexHTML = new SPLINT.DOMElement.Button.Toggle2(sw_cIndexHTML_container, "c_indexHTML");
                let sw_cIndexHTML_label = new SPLINT.DOMElement.Label(sw_cIndexHTML_container, sw_cIndexHTML.mainElement, "create 'index.html'");
                    sw_cIndexHTML_label.before();

            let sw_cSetupVScode_container = new SPLINT.DOMElement(null, "div", this.rightContent);
                let sw_cSetupVScode = new SPLINT.DOMElement.Button.Toggle2(sw_cSetupVScode_container, "c_setupVSCode");
                let sw_cSetupVScode_label = new SPLINT.DOMElement.Label(sw_cSetupVScode_container, sw_cSetupVScode.mainElement, "setup VScode project");
                    sw_cSetupVScode_label.before();
    }
}