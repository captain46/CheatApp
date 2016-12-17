/**
 * This is the mongodb model for all CodeSnippets within the mongodb.
 *
 * A basic CodeSnippetModel contains the following items
 *     - title -> a basic title like "Strategy Pattern"
 *     - date -> date added to the database
 *     - language -> the used programming language
 *     - tags -> an array of identifying tags
 *     - hidden -> used to change the visibilty of the snippet
 *     - code -> the code itself
 */
var mongoose = require('mongoose')

// Create the Schema
var CodeSnippetSchema = mongoose.Schema({
    title : String,
    description: String,
    date : { type : Date, default : Date.now },
    language : String,
    tags : [String],
    code : String
});

// Second step is to compile the schema into a actual model
// This will create a new document in the mongodb
var CodeSnippetModel = mongoose.model('CodeSnippets', CodeSnippetSchema);


module.exports = CodeSnippetModel;
