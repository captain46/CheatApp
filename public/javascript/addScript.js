/**
 * This script uses AJAX to send the input data from the add form to the servers REST endpoint
 * which then persists the received JSON into the MongoDB.
 */
window.onload = function () {
    var addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function () {
        var title = document.getElementById('title').value;
        var description = document.getElementById('description').value;
        var language = document.getElementById('language').value;
        var tagList = document.getElementById('tagList').value;
        var code = document.getElementById('code').value;

        var jsonToAdd = {
            title : title,
            description : description,
            language : language,
            tags : tagList,
            code : code
        };

        var XmlHttpReq = new XMLHttpRequest();
        XmlHttpReq.onreadystatechange = function () {
            if(XmlHttpReq.readyState === 4 && XmlHttpReq.status === 200) {
                document.getElementById('dbLog').innerHTML += "saved.";
                document.getElementById('modalForm').reset();
            }
        };
        XmlHttpReq.open('POST', window.location.href + "add/json");
        XmlHttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XmlHttpReq.send(JSON.stringify(jsonToAdd));
    });
}
