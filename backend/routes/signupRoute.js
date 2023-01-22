const express = require("express");
const router = express.Router();
const signupController = require("../controller/SignupController");

router.post("/", signupController.signupController);

module.exports = router;