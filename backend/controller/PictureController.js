require("dotenv").config({ path: '../.env' });
const { Configuration, OpenAIApi } = require("openai");
const UserPicture = require("../model/UserPicture");

exports.fetchMyPictures = (req, res) => {
    const { email } = JSON.parse(req.body.body);

    UserPicture.find( { email }, (err, docs) => {
        if (err) {
            res.status(400).json({
                message: "No User affilated searches found"
            });
        }
        else {
            res.status(200).json({
                message: "Pictures pertaining to the User found",
                docs
            });
        }
    });
}

exports.insertPicture = (req, res) => {
    const { email, search } = JSON.parse(req.body.body);
    let newUserPicture = new UserPicture({ email: email, search: search});

    newUserPicture.save()
    .then(() => {
        res.status(201).json({
            message: "Picture saved to database"
        });
    })
    .catch(() => {
        res.status(400).json({
            message: "Picture could not be saved to database"
        });
    })
}

exports.createAPicture = (req, res) => {
    const { question, size } = JSON.parse(req.body.body);

    // Set up configuration using OpenAI
    const configuration = new Configuration({
        apiKey: process.env.DALLE_KEY
      });
    
    new OpenAIApi(configuration).createImage({
        prompt: question,
        n: 1,
        size: size === 'small' ? '256x256' : ( size === 'medium' ? '512x512' : '1024x1024' ) // small, medium, or large
    })
    .then(response => {
        console.log(response.data);
        res.status(200).json({
            message: 'Success',
            url : response.data.data
        });
    })
    .catch(err => {
        res.status(401).json({
            message: err
        });
    });
}