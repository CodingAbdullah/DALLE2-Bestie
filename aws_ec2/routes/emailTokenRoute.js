const express = require("express");
const userAuth = require("../middleware/userAuth");
const emailAuth = require("../middleware/emailAuth");
const emailTokenController = require("../controller/EmailTokenController");
const passwordResetController = require("../controller/PasswordResetController");
const router = express.Router();

// For email token to be sent, verify user first and then proceed to adding token to db and sending via email
router.post("/add-email-token", userAuth.verifyUserMiddleware, emailTokenController.addEmailToken);

// Verify email token and if verified, reset desired password
router.post("/verify-email-token", emailAuth.verifyEmailTokenMiddleware, passwordResetController.PasswordResetController);

module.exports = router;