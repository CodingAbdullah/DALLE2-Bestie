const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();

router.post("/user-lookup", userController.userController);

module.exports = router;