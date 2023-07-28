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
                        let ogReq = JSON.parse(req.body.body);
                        ogReq.user = docs[0];
                        req.body.body = JSON.stringify(ogReq);
                        next();
                    }
                })
            }
        });
    }
}

exports.verifyFileUploadRouteJWTMiddleware = (req, res, next) => {
    // Setting variables for extracting header values
    let tokenExists = false;
    let tokenValue = '';
    let fileSize = '';
    let fileTitle = '';

    // Iterate through the headers and find Authorization..
    for (var i = 0 ; i < req.rawHeaders.length; i++) {
        if (req.rawHeaders[i] === 'Authorization'){
            tokenExists = true;
            tokenValue = req.rawHeaders[i + 1];
            break;
        }
        else {
            continue;
        }
    }

    // Extract file size and title from headers
    for (var j = 0; j < req.rawHeaders.length; j++){
        if (req.rawHeaders[j] === 'Header-File-Size'){
            fileSize = req.rawHeaders[j + 1];
        }
        if (req.rawHeaders[j] === 'Header-File-Title'){
            fileTitle = req.rawHeaders[j + 1];
        }
    }
    
    if (tokenExists) {
        // If token exists, check to see if the Bearer is valid
        if (tokenValue.split(" ")[1] === undefined || tokenValue.split(" ")[1] === null) {
            res.status(401).json({
                message: "UnAuthorized route",
                token: false
            });
        }
        else {
            jwt.verify(tokenValue.split(" ")[1], process.env.SECRET, (err, result) => {
                // Decode payload if valid, if not throw err
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
                            let ogReq = {};
                            ogReq.user = docs[0];
                            ogReq.fileSize = fileSize;
                            ogReq.fileTitle = fileTitle;
                            req.body.body = JSON.stringify(ogReq);
                            next();
                        }
                    })
                }
            });
        }
    }
    else {
        // Token does not exist, throw error
        res.status(401).json({
            message: "JWT Token does not exist"
        });
    }
}