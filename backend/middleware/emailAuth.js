require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");

exports.verifyEmailTokenMiddleware = (req, res, next) => {
    const { email, token } = JSON.parse(req.body.body);

    UserToken.find({ email }, (err, docs) => {
        if (err){
            res.status(400).json({
                message: "Cannot verify at this time"
            });
        }
        else {
            if (docs.length > 0){
                let tokenData = docs[0]; // Grab the first and only token in the db for the user

                // Verify this jwt token
                jwt.verify(tokenData.token, process.env.SECRET, (err, decoded) => {
                    if (err) {
                        UserToken.deleteOne({ email }); // Delete old token that is expired and send response

                        res.status(200).json({
                            message: "Expired verification code",
                            verified: false
                        });
                    }
                    else {
                        // If still active, verify the payload of the token to the token user entered to complete process
                        if ( decoded.data === token ) {

                            // Once verified, delete token from database and pass control to the succeeding middleware
                            UserToken.deleteOne({ email });
                            next();
                            /*
                                res.status(200).json({
                                    message: "Verified verification code",
                                    verified: true
                                });
                            */
                        }
                        else {
                            // User did not enter the right verification code, hence redirect back
                            res.status(200).json({
                                message: "Invalid verification code",
                                verified: false
                            });
                        }
                    }
                });
            }
            // No token associated with said User was located
            else {
                res.status(200).json({
                    message: "No token found",
                    verified: false
                });
            }
        }
    });
}