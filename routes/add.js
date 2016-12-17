/**
 * add.js
 */
var express = require('express');
var router = express.Router();


var CodeSnippetModel = require('../models/CodeSnippetModel');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('add');
});

/*
* REST endpoint that accepts a JSON 
 */
router.post('/json', function (req, res) {
    
    var objectToAdd = new CodeSnippetModel(
        {
            title : req.body.title,
            description : req.body.description,
            date : Date.now(),
            language : req.body.language,
            tags : req.body.tags,
            code : req.body.code
        });
    objectToAdd.save(function(err) {
        if(err) {
            res.send("error")
        } else {
            res.send('success');
        }
    });
});

module.exports = router;
