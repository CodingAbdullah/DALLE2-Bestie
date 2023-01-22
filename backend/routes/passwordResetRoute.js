const express = require("express");
const router = express.Router();
const passwordResetController = require("../controller/PasswordResetController");

router.post("/", passwordResetController.PasswordResetController);

module.exports = passwordResetController;