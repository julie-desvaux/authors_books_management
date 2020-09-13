// VARIABLES
const mongoose  = require('mongoose');

// SCHEMA
const authorSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    lastName    : String,
    firstName   : String,
    age         : Number,
    sex         : Boolean,
});

authorSchema.virtual('books', {
    ref             : 'Book',
    localField      : '_id',
    foreignField    : 'author'
})

module.exports = mongoose.model("Author", authorSchema);