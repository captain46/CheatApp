"use strict" 

/*
* reads the offline storage
*/
document.getElementById("showOfflineStorage").onclick = function() {

    document.getElementById("myOfflineStorage").innerHTML = "";

    var myObjects = localStorage.getItem("myCodeSnippets");

    document.getElementById("myOfflineStorage").innerHTML = "<h2>stored snippets</h2>";

    if(myObjects === null) {
        document.getElementById("myOfflineStorage").innerHTML += "no snippets to display";
    } else {

        var myJsonObj = JSON.parse(myObjects);

        for(var i in myJsonObj.snippets) {
            document.getElementById("myOfflineStorage").innerHTML += "<div class='resBox'>"
            + "<h3>" +myJsonObj.snippets[i].title + "</h3>"
            + "<pre><code>" + myJsonObj.snippets[i].code + "</pre></code>"
            + "</div>";
        } 
    }
}


/*
* deletes the entire saved code snippets from offline storage
*/
document.getElementById("clearOfllineStorage").onclick = function() {
    document.getElementById("myOfflineStorage").innerHTML = "";
    localStorage.removeItem("myCodeSnippets");
}

/*
* looks for requested results in stackoverflow API and database
*/
function showResults() {

    document.getElementById("resultsDB").innerHTML = "";
    document.getElementById("resultsAPI").innerHTML = "";

    var text = document.getElementById("tags").value;

    if(text.length >= 2) {
        searchInDatabase(text);
        searchInStackoverflowAPI(text);
    } else {
        showError('searchLog', 'Oh no!', 'You really should enter more than 2 characters!');
    }
}

/*
 * Eventhandler for Button
 */
document.getElementById("getSearchResults").onclick = function() {
    showResults();
}

/*
 * Eventhandler for Tab and Enter
 */
document.addEventListener("DOMContentLoaded", function() {
    document.body.onkeydown = function(evt) {
        var tab_key = 9;
        var enter_key = 13;

        if(evt.keyCode == tab_key || evt.keyCode == enter_key) {
            showResults();
        }
    }
}, false);

/*
* looks for results in mongodb
*/ 
function searchInDatabase(kw) {

    var http_req = new XMLHttpRequest();
    
    http_req.onreadystatechange = function() {

        if(http_req.readyState == 4 && http_req.status == 200) {
            
            var jsonObj = JSON.parse(http_req.responseText);

            document.getElementById("resultsDB").innerHTML += "<h2>results</h2>";

            for(var i in jsonObj) {
               document.getElementById("resultsDB").innerHTML += "<div class='resBox'>"
                   + "<h3>"
                   + jsonObj[i].title + "</h3> "
                   + "<p>" + jsonObj[i].description + "</p>"
                   + "<span class='label label-default'>" + jsonObj[i].tags + "</span>"
                   + "<pre><code>" + jsonObj[i].code
                   + "</code></pre>"
                   + "<button class=\"persistLocal\" value=\""+jsonObj[i]._id
                   + "\">save Result</button>"
                   + "</div>";
            }
            addEventListenersToButtons();
        }
    }    

    http_req.open("GET", "/search/tags/"+ kw, true);
    http_req.send();
}

/*
* first of all a GET request is needed to get results from the API
* then the client forwards the result via POST to the server
* finally the server will return a JSON object - see bodyparser on server side
*/
function searchInStackoverflowAPI(kw) {
    
    var apiUrl = "http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&title=" + kw + "&site=stackoverflow&filter=!LURkkz3bEG()-aLjeiUtiu";

    var http_req = new XMLHttpRequest();

    http_req.onreadystatechange = function() {
        if(http_req.readyState == 4 && http_req.status == 200) {

        getQuestion(new XMLHttpRequest(), 'http://localhost:3000/showAPI/question', 'POST', http_req.responseText);
     }
    }

    http_req.open("GET", apiUrl, true);
    http_req.send();
}


function getAnswerToQuestionFromStackOverflow(question_id) {

    var apiUrl = "https://api.stackexchange.com/2.2/questions/" + question_id +"/answers?order=desc&sort=votes&site=stackoverflow&filter=!9YdnSMKKT"

    var http_req = new XMLHttpRequest();

    http_req.onreadystatechange = function() {
        if(http_req.readyState == 4 && http_req.status == 200) {

            getAnswer(new XMLHttpRequest(), 'http://localhost:3000/showAPI/answer', 'POST', http_req.responseText);
        }
    }

    http_req.open("GET", apiUrl, true);
    http_req.send();
}


/*
* makes the POST request to the server to parse the gzipped response from the stackoverflow api
* see searchInStackoverflowAPI(...) 
*/
function getQuestion(xhttp, url, method, payload) {
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            
            var jsonObj = JSON.parse(xhttp.responseText);

            document.getElementById('resultsAPI').innerHTML =
                "<div class='resBox'>"
                + "<div class='alert alert-info' role='alert'>Popular Stackoverflow Question with Answer:</div>"
                + "<h3>" + jsonObj.title + "</h3>"
                + "<p>" + jsonObj.question + "</p>"
                + "</div>";

            getAnswerToQuestionFromStackOverflow(jsonObj.question_id);
        }   
    }
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhttp.send(payload);
}

function getAnswer(xhttp, url, method, payload) {
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            var answer = JSON.parse(xhttp.responseText);

            document.getElementById('resultsAPI').innerHTML +=
                "<div class='resBox'>"
                + "<h3>Answer: </h3>"
                + "<p>" + answer.answer + "</p>"
                + "</div>";
        }
    }
    xhttp.open(method, url);
    xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhttp.send(payload);
}

/*
* entrypoint for offline storage: empty JSON array
*/
function prepareLocalStorage() {
    localStorage.setItem("myCodeSnippets", "{ \"snippets\": [] }");
}

/*
* prepares everything for adding eventhandlers
* for dynamical created buttons 
*/
function addEventListenersToButtons() {

    var saveButtons = document.getElementsByClassName("persistLocal");

    for(var i = 0; i < saveButtons.length; i++) {
        var button = saveButtons[i];
        add(button);
    }
}

/*
* adds an eventhandler to each button 
* and saves the result to the offline storage if requested
*/
function add(button) {
    button.addEventListener("click", function () {
        var xml_http = new XMLHttpRequest();
        
        xml_http.onreadystatechange = function() {
            if(xml_http.readyState == 4 && xml_http.status == 200) {
                var jsonObj = JSON.parse(xml_http.responseText);

                var alreadySaved = JSON.parse(localStorage.getItem("myCodeSnippets"));

                if(alreadySaved === null) {
                    prepareLocalStorage();
                    alreadySaved = JSON.parse(localStorage.getItem("myCodeSnippets"));
                }

                alreadySaved.snippets.push(jsonObj);

                var dataToStore = JSON.stringify(alreadySaved);
                localStorage.setItem("myCodeSnippets", dataToStore);
                document.getElementById('showOfflineStorage').click();
            }
        }

        xml_http.open("GET", "/search/id/"+button.value ,true);
        xml_http.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        xml_http.send();
    });
}


/*
 * Appends an Error field the the given html tag
 */
function showError(element, heading, message) {

    var errors = document.getElementsByClassName("alert alert-danger alert-dismissible fade in");

    if(errors.length == 0) {
        document.getElementById(element).innerHTML += '<div class="alert alert-danger alert-dismissible fade in" role="alert"> ' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> ' +
            '<strong> ' + heading + ' </strong> ' +  message + ' </div>';
    }
}
