// Adding a model to track User pictures
const mongoose = require("mongoose");

const UserPicture = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    search: {
        type: String,
        required: true
    },
    time : {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("UserPicture", UserPicture);