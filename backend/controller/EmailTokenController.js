require("dotenv").config({ path: '../.env' });
const EmailToken = require("../model/EmailToken");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

// Take the verified token from SMTP server, encrypt using JWT, store to db. Upon verification, verify if it is not expired
exports.addEmailToken = (req, res) => {
    const { email } = JSON.parse(req.body.body);

    let token = uuid.v4(); // Generate a random uuid token using version 4 to send as verification code
    let message = `For password reset, this is your verification code : <b>${ token }</b>`;

    // Create transport using nodemailer for sending email with code
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    // Verify if User already has a token 
    EmailToken.find({ email }, (err, docs) => {
        if (err) {
            res.status(400).json({
                message: "Cannot query tokens"
            });
        }
        else {
            if (docs.length > 0) {
                EmailToken.deleteOne({ email }); // Delete the record that has the email with its verification token

                // Set new token expiry to 5 minutes
                let jwtToken = jwt.sign({ data: token } , process.env.SECRET, { expiresIn: 60 * 5 });

                // Save to database
                let emailToken = new EmailToken({ email, token: jwtToken });   
                
                emailToken.save()
                .then(() => {
                    // Send verification code via email 
                    transport.sendMail({
                        from: process.env.USER,
                        to: email,
                        subject: 'Verification Code for Password reset for OpenAI Image Generator site',
                        html: `<h1>Verification Code</h1>
                               <p>${message}</p>`
                    })
                    .then(() => {
                        res.status(201).json({
                            message: "Token found, updated email token with new one"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            message: "Verification code could not be sent " + err
                        });
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: 'Cannot save token to database ' + err
                    });
                });
            }
            else {
                // Set token expiry to 5 minutes
                let jwtToken = jwt.sign({ data: token } , process.env.SECRET, { expiresIn: 60 * 5 });

                // Save to database
                let emailToken = new EmailToken({ email, token: jwtToken });

                emailToken.save()
                .then(() => {
                    // Send verification code via email 
                    transport.sendMail({
                        from: process.env.USER,
                        to: email,
                        subject: 'Verification Code for Password reset for OpenAI Image Generator site',
                        html: `<h1>Verification Code</h1>
                               <p>${message}</p>`
                    })
                    .then(() => {
                        res.status(201).json({
                            message: "Token added"
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: "Verification code could not be sent " + err
                        });
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Cannot save token to db: " + err
                    });
                });
            }
        }
    });
}