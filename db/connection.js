/**
 * This file is used to intialize the mongodb database connection.
 * 
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('successfully connected to mongodb!');
});

module.exports = db;
