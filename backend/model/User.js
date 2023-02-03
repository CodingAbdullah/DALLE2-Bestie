// User model goes here
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    numberOfPictures : {
        type: Number,
        required: true
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model('User', User);