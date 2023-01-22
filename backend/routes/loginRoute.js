const express = require("express");
const router = express.Router();
const loginController = require("../controller/LoginController");

router.post("/", loginController.loginController);

module.exports = router;