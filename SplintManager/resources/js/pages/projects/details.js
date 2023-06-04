
class P_ProjectDetails extends templateExtendedPage {
    constructor(parent, data){
        super("projectDetails", parent);
        this.initEvents();
        this.draw();
    }
    initEvents(){
        window.onhashchange = function(){
            SM_header.drawPath();
            let hashes = SPLINT.Tools.Location.getHashes();
            if(hashes.includes("config")){
                this.rightContent.clear();
                this.drawConfig();
            } else if(hashes.includes("error_log")){
                this.rightContent.clear();
                new SM_error_log_Overview(this.rightContent, this.data);
            } else if(hashes.includes("PHP_error_log_MySQL")){
                this.rightContent.clear();
                new SM_PHP_debuggLog(this.rightContent, this.data, "PHP_error_log_MySQL.log");  
                this.focusData("PHP_error_log_MySQL");
            } else if(hashes.includes("PHP_error_log")){
                this.rightContent.clear();
                new SM_PHP_debuggLog(this.rightContent, this.data, "PHP_error_log.log");  
            } else if(hashes.includes("PHP_debugg_log")){
                this.rightContent.clear();
                new SM_PHP_debuggLog(this.rightContent, this.data, "PHP_debugg_log.log");  
            } else if(hashes.includes("viewProjectDetails")){
                this.rightContent.clear();
                let f = async function(){
                    await this.getData();
                    this.drawOverview();
                }.bind(this);
                f();
            } else {
                // window.location.hash = "viewProjectDetails";
            }
        }.bind(this)
    }
    async getData(){
        let params = SPLINT.Tools.Location.getParams().name;
        let a = (await SP_inspectProjects.inspect(true));
        for(const e of a){
            if(e.config.projectName == params){
                this.data = e
            }
        }
    }
    async draw(){
        this.addData("error_log", "error_log", {
            "PHP error log"     : "PHP_error_log", 
            "PHP debugg log"    : "PHP_debugg_log", 
            "PHP MySQL log"     : "PHP_error_log_MySQL"});
        this.addData("config", "config");
        super.draw();
        await this.getData();
        this.drawOverview();
    }
    drawConfig(){
        let c_serverContainer = new SPLINT.DOMElement(this.id + "c_serverContainer", "div", this.rightContent);
        let obje = new SPLINT.DOMElement.ObjectEditor(c_serverContainer, "test", this.data.config);
            obje.onedit = function(obj, val){
                SP_inspectProjects.saveConfig(obj, this.data.uri);
            }.bind(this);
        return;
    }
    drawOverview(){
        let headline = new SPLINT.DOMElement(this.id + "headline", "div", this.rightContent);
            headline.Class("headline");
            let head_name = new SPLINT.DOMElement.SpanDiv(headline, "name", this.data.config.projectName);

        let log_Container = new SPLINT.DOMElement(this.id + "log_container", "div", this.rightContent);
            let log_overview = new SM_error_log_Overview(log_Container, this.data);
            
    }
    drawError_logOverview(){
        let error_logContainer = new SPLINT.DOMElement(this.id + "error_log_Container", "div", this.rightContent);
        //         // let call = new SPLINT.CallPHP(SP)
        let uri = location.origin + this.data.config.paths.error_log + "PHP_error_log.log";
        let res = SPLINT.Utils.Files.read(uri);
    }
}
// class P_IndexProjects extends templateMenuPage {
//     data = null;
//     constructor(){
//         super("IndexProjects");
//         this.addData("Projects", "/projects/index.html");
//         this.selectHash();
//     }
//     selectHash(){
//         let hashes = SPLINT.Tools.Location.getHashes();
//         if(hashes.includes("viewProjectDetails")){
//             let params = SPLINT.Tools.Location.getParams();
//             console.dir(params)
//             new P_ProjectDetails();
//         } else {
//             this.drawList();
//         }
//         addEventListener("hashchange", this.selectHash.bind(this));
//     }
//     async getData(forceRefresh = false){
//         if(this.data == null || forceRefresh){
//             this.data = await SP_inspectProjects.inspect();
//         }
//         return this.data
//     }
//     async drawList(){
//         super.draw();
//         let res = await this.getData();
//         console.dir(res);
//         this.projectsTable = new SPLINT.DOMElement.Table.Grid(this.mainElement, "projectsTable", res.length, 2);
//         this.projectsTable.getHead();
//         let gen = SPLINT.DOMElement.SpanDiv.get;
//         gen(this.projectsTable.getData2Head(0), "", "name");
//         gen(this.projectsTable.getData2Head(1), "", "buttons");

//         for(const index in res){
//             let data = res[index];
//             let config = data.config;
//             let id = "projectsTable_" + index + "_" + config.projectName + "_";
//             console.log(index, data);
//             gen(this.projectsTable.getData(index, 0), "", config.projectName);
//             let buttonsDiv = new SPLINT.DOMElement(id + "buttons", "div", this.projectsTable.getData(index, 1));
//                 buttonsDiv.Class("buttonsDiv");
//                 let bt_view = new SPLINT.DOMElement.Button(buttonsDiv, "view", "view");
//                     bt_view.onclick = function(){
//                         SPLINT.Tools.Location.addHash("viewProjectDetails").addParams({"projectIndex":index}).call();
//                         // SPLINT.Tools.Location.addParams({
//                         //     "key":"value",
//                         //     "key1":"value1"
//                         // }).call();
//                         console.dir(SPLINT.Tools.Location.getParams());
//                         SPLINT.Tools.Location.getParams();
//                         // SPLINT.Tools.Location.addParam("test", "value").addParam("test1", "value1").call();
//                         // S_Location.setHash("project_View");
//                     }.bind(this);
//                 let bt_errorLog = new SPLINT.DOMElement.Button(buttonsDiv, "error_log", "error_log");
//             // gen(this.projectsTable.getData(index, 0), "", config.projectName);
//         }
//         // new SPLINT.DOMElement.SpanDiv(tableElement.getData(index, 0), "", project.EPType);
//         // this.projectsList = new SPLINT.DOMElement.Table.List(this.mainElement, "projectsList", res);
//         // this.projectsList.func_drawListElement = function(data, index, listElement){
//         //     let config = data.config;
//         //     let table = new SPLINT.DOMElement.Table.TextTable(listElement, index);
//         //         table.addRow("project name", config.projectName);
//         //     console.dir(data);
//         // }
//         // this.projectsList.draw();
//         // let call = new SPLINT.CallPHP(SP)
//         console.log(await CallPHP_log.read_error_log());
//     }
// }