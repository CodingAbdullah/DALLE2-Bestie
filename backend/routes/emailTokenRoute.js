const express = require("express");
const user = require("../middleware/user");
const emailToken = require("../middleware/emailToken");
const emailTokenController = require("../controller/EmailTokenController");
const passwordResetController = require("../controller/PasswordResetController");
const router = express.Router();

// For email token to be sent, verify user first and then proceed to adding token to db and sending via email
router.post("/add-email-token", user.verifyUserMiddleware, emailTokenController.addEmailToken);

// Verify email token and if verified, reset desired password
router.post("/verify-email-token", emailToken.verifyEmailTokenMiddleware, passwordResetController.PasswordResetController);

module.exports = router;