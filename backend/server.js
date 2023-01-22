require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require('./routes/signupRoute');
const mongoose = require("mongoose");
const URI = "mongodb+srv://owner:" + process.env.DB_PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
});

mongoose.connect(URI).then(() => {
    console.log("Connection to DB was successful")
})
.catch(err => {
    console.log("Error occurred in signing in to Mongo DB Atlas " + err);
});

app.use(cors()); // Enabling CORS
app.use("/", loginRoute);
app.use("/", signupRoute);