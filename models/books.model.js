// VARIABLES
const mongoose  = require('mongoose');

// SCHEMA
const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name        : String,
    author      : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Author",
        required : true
    },
    pages       : Number,
    description : String,
    image       : String
});

module.exports = mongoose.model("Book", bookSchema);



