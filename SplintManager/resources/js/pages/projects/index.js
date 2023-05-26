
class P_IndexProjects extends templateMenuPage {
    constructor(){
        super("IndexProjects");
        this.addData("Projects", "/projects/index.html");
        this.selectHash();
        window.addEventListener("hashchange", this.selectHash.bind(this));
    }
    selectHash(){
        let hashes = SPLINT.Tools.Location.getHashes();
        console.dir(window.location.hashes)
        if(hashes.includes("viewProjectDetails")){
            let params = SPLINT.Tools.Location.getParams();
            this.mainElement.innerHTML = "";
            new P_ProjectDetails(this.mainElement, this.data);
        } else {
            this.drawList();
        }
    }
    async getData(forceRefresh = false){
            return SP_inspectProjects.inspect(true);
    }
    async drawList(){
        super.draw();
        let res = await this.getData();
        console.dir(res);
        this.projectsTable = new SPLINT.DOMElement.Table.List(this.mainElement, "projectsTable", res);
        this.projectsTable.Class("projectsTable");
        this.projectsTable.func_drawListElement = function(data, index, listElement){
            let headline = new SPLINT.DOMElement.SpanDiv(listElement, "headline_" + index, data.config.projectName);
                headline.Class("headline");
                let buttonsDiv = new SPLINT.DOMElement(listElement.id + "_buttons", "div", listElement);
                    buttonsDiv.Class("buttons");
                    let button = new SPLINT.DOMElement.Button(buttonsDiv, index, "details");
                        button.setStyleTemplate(S_Button.STYLE_DEFAULT);
                        button.onclick = function(){
                            SPLINT.Tools.Location.addHash("viewProjectDetails").addParams({"projectIndex":index}).call();
                        }
                
                let informationTable = new SPLINT.DOMElement.Table.TextTable(listElement, "information_" + index);
                    informationTable.addRow("URI", data.uri);
            console.log(data);
        }
        this.projectsTable.draw();
        // this.projectsTable = new SPLINT.DOMElement.Table.Grid(this.mainElement, "projectsTable", res.length, 2);
        // this.projectsTable.getHead();
        // let gen = SPLINT.DOMElement.SpanDiv.get;
        // gen(this.projectsTable.getData2Head(0), "", "name");
        // gen(this.projectsTable.getData2Head(1), "", "buttons");

        // for(const index in res){
        //     let data = res[index];
        //     let config = data.config;
        //     let id = "projectsTable_" + index + "_" + config.projectName + "_";
        //     console.log(index, data);
        //     gen(this.projectsTable.getData(index, 0), "", config.projectName);
        //     let buttonsDiv = new SPLINT.DOMElement(id + "buttons", "div", this.projectsTable.getData(index, 1));
        //         buttonsDiv.Class("buttonsDiv");
        //         let bt_view = new SPLINT.DOMElement.Button(buttonsDiv, "view", "view");
        //             bt_view.onclick = function(){
        //                 SPLINT.Tools.Location.addHash("viewProjectDetails").addParams({"projectIndex":index}).call();
        //                 // SPLINT.Tools.Location.addParams({
        //                 //     "key":"value",
        //                 //     "key1":"value1"
        //                 // }).call();
        //                 // console.dir(SPLINT.Tools.Location.getParams());
        //                 // SPLINT.Tools.Location.getParams();
        //                 // SPLINT.Tools.Location.addParam("test", "value").addParam("test1", "value1").call();
        //                 // S_Location.setHash("project_View");
        //             }.bind(this);
        //         let bt_errorLog = new SPLINT.DOMElement.Button(buttonsDiv, "error_log", "error_log");
        //     // gen(this.projectsTable.getData(index, 0), "", config.projectName);
        // }
        // // new SPLINT.DOMElement.SpanDiv(tableElement.getData(index, 0), "", project.EPType);
        // // this.projectsList = new SPLINT.DOMElement.Table.List(this.mainElement, "projectsList", res);
        // // this.projectsList.func_drawListElement = function(data, index, listElement){
        // //     let config = data.config;
        // //     let table = new SPLINT.DOMElement.Table.TextTable(listElement, index);
        // //         table.addRow("project name", config.projectName);
        // //     console.dir(data);
        // // }
        // // this.projectsList.draw();
        // // let call = new SPLINT.CallPHP(SP)
        // console.log(await CallPHP_log.read_error_log());
    }
}