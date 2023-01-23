require("dotenv").config({ path: '../../.env' });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.loginController = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);

    User.find({ email }, (err, result) => {
        if (err) {
            res.status(400).json({ 
                message: "Cannot lookup db",
                token: null
            });
        }
        else {
            if (result.length === 0) {
                res.status(200).json({
                    message: "No user found",
                    userExist: false,
                    password: false,
                    token: null
                });
            }
            else {
                bcrypt.compare(password, result[0].password, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            message: "Unable to trace password",
                            token: null
                        });
                    }
                    else {
                        if (!result) {
                            res.status(200).json({
                                message: "Invalid password",
                                userExist: true,
                                password: false,
                                token: null
                            });
                        }
                        else {
                            // Sign token with payload, keep it valid for 1 hour
                            let jwtToken = jwt.sign({ data: email } , process.env.SECRET, { expiresIn: 60 * 60 });
                            res.status(200).json({
                                message: "Email and password verified!",
                                userExist: true,
                                password: true,
                                token: jwtToken
                            });
                        }
                    }
                });
            }
        }
    });   
}