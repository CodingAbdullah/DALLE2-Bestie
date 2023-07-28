require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require('./routes/signupRoute');
const pictureRoute = require("./routes/pictureRoute");
const emailTokenRoute = require("./routes/emailTokenRoute");
const expressFileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const URI = "mongodb+srv://owner:" + process.env.DB_PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.listen(process.env.PORT || 8080, 'localhost', () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
});

mongoose.connect(URI).then(() => {
    console.log("Connection to DB was successful")
})
.catch(err => {
    console.log("Error occurred in signing in to Mongo DB Atlas " + err);
});

// Set up req-res structure
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // Enabling CORS
app.use(expressFileUpload()); // Adding the file upload middleware
app.use("/", loginRoute);
app.use("/", signupRoute);
app.use("/", pictureRoute); // Pass in auth middleware for protected routes. JWT verification will be required
app.use("/", emailTokenRoute);