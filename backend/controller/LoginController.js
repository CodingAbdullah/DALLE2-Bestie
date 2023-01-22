const bcrypt = require("bcryptjs");
const User = require("../model/User");

exports.loginController = (req, res) => {
    const { email, password } = req.body;

    User.find({ email }, (err, result) => {
        if (err) {
            res.status(400).json({ 
                message: "Cannot lookup db"
            });
        }
        else {
            if (result.length === 0) {
                res.status(401).json({
                    message: "No user found"
                });
            }
            else {
                bcrypt.compare(password, result[0].password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            message: "Unable to trace password"
                        });
                    }
                    else {
                        if (!result) {
                            res.status(401).json({
                                message: "Invalid password"
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Email and password verified!"
                            })
                        }
                    }
                });
            }
        }
    });   
}