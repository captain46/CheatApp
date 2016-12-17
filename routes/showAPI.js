var express = require('express');
var router = express.Router();
var request = require('request');



/*
* Parses a question from the stackoverflow api and assembles a new json object containing the title, body and the corresponding
* top answer id of the question.
*
* Returns the created json object.
 */
router.post("/question", function(req, res) {

    var jsonforClient = { title:req.body.items[0].title, question : req.body.items[0].body, question_id:req.body.items[0].question_id };
    
    res.send(jsonforClient);
});


router.post("/answer", function(req, res) {

    var jsonForClient = { answer : req.body.items[0].body };

    res.send(jsonForClient);
});

module.exports = router;
