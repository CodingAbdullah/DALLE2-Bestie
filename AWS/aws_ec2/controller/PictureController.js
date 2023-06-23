require("dotenv").config({ path: '../.env' });
const { Configuration, OpenAIApi } = require("openai");
const UserPicture = require("../model/UserPicture");
const User = require('../model/User');
let S3 = require('aws-sdk/clients/s3');
const request = require("request");
// Create a new bucket in a region specified with credentials to access an existing one or create a new one

// Using the URL provided by the user from the create image request, create a new image URL to upload to AWS S3 and store
// the actual AWS S3 Image URL to MongoDB to persist OpenAI's created image

// Set up AWS configuration here and AWS S3 Bucket as well
let configuration = {
    accessKeyId : process.env.AWS_S3_ACCESS_ID,
    accessSecretKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION_NAME
}

// AWS S3 Bucket should be up and running..
S3 = new S3(configuration);

exports.fetchPictures = (req, res) => {
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

exports.insertAPicture = (req, res) => {
    const { email, user, search, size, url } = JSON.parse(req.body.body);

    let number = Number.parseInt(user.totalStoredPictures) + 1;

    // Make API call to retrieve User image from OpenAI URL in order to create a blob, upload to S3, upload S3 URL to MongoDB
    // If URL is true, create a blob with the URL processed 
    request.get({
        method: 'GET',
        url: url,
        encoding: null, // If null, the body is returned as a Buffer.
    }, (error, response, body) => {
        if (error) {
            res.status(200).json({
                message: "Cannot upload image to AWS S3"
            });
        }
        else if (!error && response.statusCode == 200) {
            const data = {
                Bucket: process.env.AWS_S3_BUCKET_NAME, 
                Key: email + number, // A unique identifier for S3 upload URL, help to iterate through images later
                Body: body,
                ContentType: response.headers['content-type']
            };

            S3.upload(data, (err, data) => {
                if (err) {
                    res.status(200).json({
                        message: "Cannot upload image to AWS S3 " + err
                    });
                } 
                else {
                    let newUserPicture = new UserPicture({ email, search, size, url : data.Location });

                    // Insert picture into MongDB with AWS S3 URL instead
                    newUserPicture.save()
                    .then(() => {
                        // Update user information using the user object passed in the middleware to request and return
                        User.updateOne({ email : email }, { $set : { numberOfPicturesCurrentlyStored : user.numberOfPicturesCurrentlyStored + 1, totalStoredPictures: user.totalStoredPictures + 1 }})
                        .then(() => {
                            res.status(201).json({
                                message: 'User picture uploaded and count updated'
                            });
                        })
                        .catch(() => {
                            res.status(200).json({
                                message : "Picture saved to db but unable to update user"
                            });
                        });
                    })
                    .catch(() => {
                        res.status(200).json({
                            message: "Picture could not be saved to database"
                        });
                    });
                }
            });
        }
    });
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

exports.deleteAPicture = (req, res) => {
    const { user, url } = JSON.parse(req.body.body);
    
    let params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: url.split("/")[3].split("%40")[0] + "@" + url.split("/")[3].split("%40")[1] // Split on / and @=%40 and combine the two
    }

    // Delete object from bucket using the specified parameters outlined above
    S3.deleteObject(params, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not delete image " + err
            });
        }
        else {
            // Delete picture based on unique URL from UserPicture collection
            UserPicture.deleteOne({ url : url })
            .then(() => {
                // Update user image saved count after successful UserPicture collection update
                User.updateOne({ email: user.email }, { $set : { numberOfPicturesCurrentlyStored : user.numberOfPicturesCurrentlyStored - 1 }})
                .then(() => {
                    res.status(200).json({
                        message: "Successful deletion of image and user image count revised"
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Image deleted, however User image count was not revised " + err 
                    });
                });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "Image could not be deleted " + err
                });
            });
        }
    });
}

exports.uploadAPicture = (req, res) => {
    // Code will go here...
}