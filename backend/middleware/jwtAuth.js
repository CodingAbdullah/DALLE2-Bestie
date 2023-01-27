// As this is middleware, verification will be required before sending to controller, hence this is a protected route
require('dotenv').config({ path: '../../.env' });
const jwt = require("jsonwebtoken");

exports.verifyJWTMiddleware = (req, res, next) => {
    const { token } = req.headers.Authorization.split(" ")[1]; // "Authorization <token>"

    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) {
            res.status(401).json({
                message: "Unauthorized. Invalid token"
            });
        }
        else {
            // If verified, send request over to the next piece of middleware, or in this case, controller
            req.body.result = result;
            next();
        }
    });
}