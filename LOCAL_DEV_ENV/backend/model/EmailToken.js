const mongoose = require('mongoose');

// Store email tokens for verification, check with database for expiry on client-side
const EmailToken = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token : {
        type: String,
        required: true
    },
    time : {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('EmailToken', EmailToken);