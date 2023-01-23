const bcrypt = require("bcryptjs");
const User = require("../model/User");

exports.signupController = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // Salt and hash password before storing to database
    User.find({ email }, (err, docs) => {
        if (err) {
            res.status(400).json({
                message: "Unable to query db",
            });
        }
        else {
            if (docs.length > 0) {
                res.status(200).json({
                    message: "User already exists!",
                });
            }
            else {
                bcrypt.genSalt((err, salt) => {
                    if (err) { 
                        res.status(400).json({
                            message: "Unable to sign up User",
                        });
                    }
                    else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                res.status(400).json({ 
                                    message: "Unable to sign up user",
                                });
                            }
                            else {
                                const newUser = new User({ firstName: firstName, lastName: lastName, email: email, numberOfPictures: 0, password: hash });
                                newUser.save().then(() => {
                                    res.status(201).json({
                                        message: "User added to db"
                                    });
                                })
                                .catch(err => {
                                    res.status(400).json({
                                        message: err,
                                    });
                                })
                            }
                        });
                    }
                });
            }
        }
    });
}