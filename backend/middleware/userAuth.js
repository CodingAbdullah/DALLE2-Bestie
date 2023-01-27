const User = require("../model/User");

exports.verifyUserMiddleware = (req, res, next) => {
    const { email } = JSON.parse(req.body.body);

    // Search up a User using the email requested in the database to see if any docs exist
    User.find( { email }, (err, docs) => {
        if (err){
            res.status(400).json({
                message: err
            });
        }
        else {
            // Pass handle to the succeeding controller
            if (docs.length > 0 && email.split("@")[1].trim() === 'gmail.com') {
                next();
                /*
                    res.status(200).json({
                        message: "User exists",
                        doesExist: true
                    });
                */
            }
            else if (docs.length > 0 ) {
                res.status(200).json({
                    message: "User does exist, but is not a gmail account",
                    doesExist: true
                });
            }
            else {
                res.status(200).json({
                    message: "User does not exist",
                    doesExist: false
                });
            }
        }
    });
}