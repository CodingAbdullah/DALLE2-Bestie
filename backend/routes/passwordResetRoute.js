const express = require("express");
const router = express.Router();
const passwordResetController = require("../controller/PasswordResetController");

router.post("/reset-password", passwordResetController.PasswordResetController);

module.exports = passwordResetController;