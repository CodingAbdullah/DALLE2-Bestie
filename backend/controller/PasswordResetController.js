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
                const userInfo = docs[0]; // Get the first and only user belonging to user and update password, storing the new salted/hashed version
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
                                let newUser = new User({ email: userInfo.email, firstName: userInfo.firstName, numberOfPictures: userInfo.numberOfPictures, lastName: userInfo.lastName, password: hash });
                                newUser.save()
                                .then(() => {                                    
                                    // Once verified, delete token from database and pass control to the succeeding middleware
                                    EmailToken.deleteOne({ email })
                                    .then(() => {
                                        User.deleteOne({ email , password : { $ne : hash }})
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
                                })
                                .catch(err => {
                                    res.status(400).json({
                                        message: "Unable to save new password to db: " + err
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