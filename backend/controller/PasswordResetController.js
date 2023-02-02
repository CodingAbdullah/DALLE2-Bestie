const User = require("../model/User");
const EmailToken = require("../model/EmailToken");
const bcryptjs = require("bcryptjs");

exports.PasswordResetController = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);
    
    User.find({ email }, (err, docs) => {
        if (err) {
            res.status(400).json({
                message: err
            });
        }
        else {
            if (docs.length === 0) {
                res.status(400).json({
                    message: "User not found"
                });
            }
            else {
                // User found, reset password, update User and store the new hashed password
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err){
                        res.status(400).json({
                            message: "Cannot salt password"
                        });
                    }
                    else {
                        bcryptjs.hash(password, salt, (err, hash) => {
                            if (err){
                                res.status(400).json({
                                    message: "Cannot update password, hashing issue"
                                });
                            }
                            else {                                   
                                // Once verified, delete token from database and pass control to the succeeding middleware
                                EmailToken.deleteOne({ email })
                                .then(() => {
                                    User.updateOne({ email : { $set : { password : hash } }})
                                    .then(() => {
                                        res.status(200).json({
                                            message: 'Password succesfully updated and stored to db',
                                            verified: true,
                                            updated: true
                                        });
                                    })
                                    .catch(() => {
                                        res.status(200).json({
                                            message: "Password successfully updated, old password not deleted from db",
                                            verified: true,
                                            updated: false
                                        })
                                    })
                                })
                                .catch(() => {
                                    res.status(200).json({
                                        message: 'Password succesfully updated, stored to db, but old password and token not removed',
                                        verified: false,
                                        updated: false
                                    });
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}