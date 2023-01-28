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
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD
        }
    });

    // Set token expiry to 5 minutes
    let jwtToken = jwt.sign({ data: token } , process.env.SECRET, { expiresIn: 60 * 5 });

    // Save to database
    let emailToken = new EmailToken({ email, token: jwtToken });

    emailToken.save()
    .then(() => {
        // Send verification code via email 
        transport.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Verification Code for Password reset for OpenAI Image Generator site',
            html: `<h1>Verification Code</h1>
                               <p>${message}</p>`
        })
        .then(() => {
            EmailToken.deleteMany({ email, token : { $ne : jwtToken }}) // Delete any previous tokens in db associated with account
            .then(() => {
                res.status(201).json({
                    message: "Token found, updated email token with new one and email sent"
                });
            })
            .catch(err => {
                res.status(400).json({
                    message: "Last token could not be deleted " + err
                });
            });
        })
        .catch(err => {
            EmailToken.deleteOne({ email, token : { $eq : jwtToken }}) // If email containing token could not be sent, delete the token
            .then(() => {
                // Delete the record that has the email with its verification token
                res.status(400).json({
                    message: "Verification code could not be sent " + err
                });
            })
            .catch((err2) => {
                res.status(400).json({
                    message: err + " .Error 2: " + err2
                });
            })
        });
    })
    .catch((err) => {
        res.status(400).json({
            message: "Cannot save token to db: " + err
        });
    });
}