// Adding a model to track User pictures
const mongoose = require("mongoose");

const UserPicture = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true
        },
        search: {
            type: String,
            required: true
        },
        size : {
            type: String,
            required: true
        },
        url : {
            type: String,
            required: true
        }
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserPicture", UserPicture);