/**
 * Contains a RESTful search service which returns JSON strings in the response body.
 *
 */

var express = require('express');
var router = express.Router();

var CodeSnippedModel = require('../models/CodeSnippetModel');

/*
 * If /search is accessed without any parameter throw an error.
 */
router.get('/', function(req, res) {
    res.render('404', { requestedURL : req.originalUrl });
});

/*
 * Endpoint to search for a specific id
 * this will return the result as a JSON string which then should be consumed
 * by a local javascript.
 */
router.get('/id/:id', function(req, res) {
    CodeSnippedModel.findOne({ _id : req.params.id }, function(err, result) {
        if(err) {
            res.send("An error occured while querying the database: " + err);
        }
        res.send(result);
    });
});


/*
 * Endpoint to search for a specific title
 * This endpoint is currently only used for API purposes.
 */
router.get('/title/:title', function (req, res) {
    CodeSnippedModel.find({ title : req.params.title}, function (err, results) {
        if(err) {
            res.send("An error occured while querying the database: " + err);
        }
        res.send(results);
    })
});


/*
 * Endpoint to search for a specific title.
 * This endpoint is currently only used for API purposes.
 */
router.get('/language/:language', function (req, res) {
    CodeSnippedModel.find({ language : req.params.language}, function (err, results) {
        if(err) {
            res.send("An error occured while querying the database: " + err);
        }
        res.send(results);
    })
});


/*
 * Endpoint to search between a start and a end date
 * This endpoint is currently only used for API purposes.
 */
router.get('/date/:dateFrom/:dateTo', function (req, res) {
    var ISOfrom = new Date(req.params.dateFrom).toISOString();
    var ISOto = new Date(req.params.dateTo).toISOString();

    CodeSnippedModel.find({ date : { "$gte" : ISOfrom, "$lt" : ISOto}}, function (err, results) {
        res.send(results);
    });
});


/*
 * Endpoint to search for tags.
 * Any item in the tag array will be matched with mongodb documents.
 * This will be the main REST endpoint for the applications search functionality.
 */
router.get('/tags/:tagList', function (req, res) {
    CodeSnippedModel.find( {tags : { "$regex" : req.params.tagList, "$options" : "i"}}, function (err, results) {
        if(err) {
            res.send("An error occured while querying the database: " + err);
        }
        res.send(results);
    });
});


module.exports = router;
