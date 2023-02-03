// As this is middleware, verification will be required before sending to controller, hence this is a protected route
require('dotenv').config({ path: '../../.env' });
const jwt = require("jsonwebtoken");
const User = require("../model/User"); // Adding User model to fetch data based on email

exports.verifyJWTMiddleware = (req, res, next) => {
    if (req.body.headers.Authorization === undefined || req.body.headers.Authorization === null) {
        res.status(401).json({
            message: "UnAuthorized route",
            token: false
        });
    }
    else {
        const token = req.body.headers.Authorization.split(" ")[1]; // "Authorization: "Bearer <token>"
        jwt.verify(token, process.env.SECRET, (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "Unauthorized. Invalid token",
                    token: true
                });
            }
            else {
                // If verified, find User information using email within the token, add to req body and move to next middleware
                User.find({ email : [result.data] }, (err, docs) => {
                    if (err) {
                        res.status(401).json({
                            message: "Cannot find user with that value",
                            token: true
                        })
                    }
                    else {
                        // If authenticated, move to the next piece of middleware and add user to req object
                        req.body.body.user = docs[0];
                        next();
                    }
                })
            }
        });
    }
}