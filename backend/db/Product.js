const mongoose = require('mongoose');

//This line creates a new schema object using the mongoose.Schema constructor. 
//A schema defines the structure of the documents within a collection in MongoDB.
const productSchema = new mongoose.Schema({
    //This specifies that the name field should hold string values.
    name: String, 
    price: String,
    category: String,
    userId: String,
    company: String
});

//It provides an interface to the database for creating, querying, updating, and deleting records by applying the schema to a MongoDB collection. The collection name is users.
module.exports = mongoose.model("products", productSchema);