require("dotenv").config({ path: '../.env' });
const { Configuration, OpenAIApi } = require("openai");
const UserPicture = require("../model/UserPicture");
const AWS = require('aws-sdk');
const buffer = require("buffer");
const axios = require("axios");

// Create a new bucket in a region specified with credentials to access an existing one or create a new one

// Using the URL provided by the user from the create image request, create a new image URL to upload to AWS S3 and store
// the actual AWS S3 Image URL to MongoDB to persist OpenAI's created image

// Set up AWS configuration here and AWS S3 Bucket as well
var AWS = AWS.config.update({ region : process.env.AWS_S3_REGION_NAME });

// AWS S3 Bucket should be up and running..
let S3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_SECRET_KEY,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
});

exports.fetchMyPictures = (req, res) => {
    const { email } = JSON.parse(req.body.body);
    
    // Fetch all the pictures requested by the user in the past and send as response
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
    const { email, user, search, size, url } = JSON.parse(req.body.body);

    // Make API call to retrieve User image from OpenAI URL in order to create a blob, upload to S3, upload S3 URL to MongoDB
    // If URL is true, create a blob with the URL processed 
    axios.get(url)
    .then(response => {
        let blobber = response.data.buffer();

        // Once the blob is created, upload to S3 Bucket
        S3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: email + user.numberOfPictures, // A unique identifier for S3 upload URL, help to iterate through images later
            Body: blobber
        })
        .then(response => {
                let newUserPicture = new UserPicture({ email, search, size, url : response.location });

                // Insert picture into MongDB with AWS S3 URL instead
                newUserPicture.save()
                .then(() => {
                    res.status(201).json({
                        message: "Picture saved to database"
                    });
                })
                .catch(() => {
                    res.status(200).json({
                        message: "Picture could not be saved to database"
                    });
                });
        })
        .catch(() => {
            res.status(200).json({
                message: "Cannot upload image to AWS S3"
            });
        })
    })
    .catch(() => {
        res.status(200).json({
            message: "URL expired or invalid" 
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
        // Once response is sent, send back URL to confirm with user if they want to save it to db or not
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