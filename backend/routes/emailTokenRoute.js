const express = require("express");
const emailTokenController = require("../controller/EmailTokenController");
const router = express.Router();

router.post("/add-email-token", emailTokenController.addEmailToken);
router.post("/verify-email-token", emailTokenController.verifyEmailToken);

module.exports = router;