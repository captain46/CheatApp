/**
 * update.js
 */
var express = require('express');
var router = express.Router();

var CodeSnippetModel = require('../models/CodeSnippetModel');

/*  root get route
 *  http://host/update
 *  this should render an error page */
router.get('/', function(req, res) {
    res.render('404', { requestedURL : req.originalUrl });
});


/*
* Updates a document in the database with the JSON values received in the request.
* TODO: This has to be restricted to loggedin users!
 */
router.put('/:id', function(req, res){
    CodeSnippetModel.findOne({_id: req.params.id}, function (err, result) {
        result.title = req.body.title;
        result.description = req.body.description;
        result.language = req.body.language;
        result.tags = req.body.tags;
        result.code = req.body.code;

        result.save();
    });
    res.send('success.');
});


/*
* Adds a new tag to a document
 */
router.put('/addTag/:id/:tag', function(req, res) {
    console.log(req.params);
   CodeSnippetModel.findOne({ _id : req.params.id}, function(err, result) {
      result.tags.push(req.params.tag)

       result.save();
   });
    res.send('success.');
});

/*
* Removes a tag from a document.
* TODO: test
 */
router.put('/removeTag/:id/:tag', function(req, res) {
   CodeSnippetModel.findOne({ _id : req.params.id}, function(err, result) {
       result.tags.forEach(function(entry) {
           if(entry.localeCompare(req.params.tag) == 0) {
               result.splice(entry);
           }
       })
   })
});


module.exports = router;
