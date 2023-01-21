require("dotenv").config({ path: './env' });
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
});

app.use(cors()); // Enabling CORS