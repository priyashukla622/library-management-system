const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Corrected 'require' to 'required'
    },
    authorName: {
        type: String,
        required: true // Corrected 'require' to 'required'
    },
    publish: {
        type: String,
        required: true // Corrected 'require' to 'required'
    },
    price: {
        type: Number,
        required: true 
    },
    Date: {
        type: Date,
        default: Date.now
    },
    language:{
        type:String,
        required:true
    }
});
const bookModel = mongoose.model("bookData", bookSchema);
module.exports = bookModel;