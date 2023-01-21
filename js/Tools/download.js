
class download_S {
    static download(uri = PATH.images.logo, name = "test"){
        
        var link = document.createElement("a");
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute('download', name);
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}


// function DownloadNC(orderID, blob) {
//     // let order = getOrderDataByID(orderID);
//     // let orderData = JSON.parse(order["OrderData"]);
//     // let projectData = getProjectData(order["UserID"], orderData[itemID]["projectID"]);
//     // let blob = projectData["FullNC0"];
//     var link = document.createElement("a");
//     link.href = "data:text/plain;base64," + blob;
//     link.setAttribute('download', orderID + "_GCode.nc");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
// }