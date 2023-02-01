// As this is middleware, verification will be required before sending to controller, hence this is a protected route
require('dotenv').config({ path: '../../.env' });
const jwt = require("jsonwebtoken");

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
                // If verified, send request over to the next piece of middleware add users email to request body
                req.body.body = result.data;
                next();
            }
        });
    }
}