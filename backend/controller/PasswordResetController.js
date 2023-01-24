const User = require("../model/User");
const bcryptjs = require("bcryptjs");

exports.PasswordResetController = (req, res) => {
    const { email, newPassword } = JSON.parse(req.body.body);

    User.find( { email }, (err, docs) => {
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
                        bcryptjs.hash(newPassword, salt, (err, hash) => {
                            if (err){
                                res.status(400).json({
                                    message: "Cannot update password, hashing issue"
                                });
                            }
                            else {
                                let newUser = new User({ email: userInfo.email, firstName: userInfo.firstName, lastName: userInfo.lastName, password: hash });
                                newUser.save()
                                .then(() => {
                                    res.status(200).json({
                                        message: 'Password succesfully updated and stored to db'
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