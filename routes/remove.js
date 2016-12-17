/**
 * remove.js
 */
var express = require('express');
var router = express.Router();

var CodeSnippetModel = require('../models/CodeSnippetModel');

/*  root get route
 *  http://host/remove
 *  this should render an error page */
router.get('/', function(req, res) {
    res.render('404', { requestedURL : req.originalUrl });
});


/*
 * Purges a document from the database
 * TODO: This has to be restricted to loggedin users!
 */
router.delete('/:id', function(req, res){
    CodeSnippetModel.findOne({_id: req.params.id}, function (err, result) {
        result.remove();
        result.exec();
    });
    res.send('success.');
});


module.exports = router;
