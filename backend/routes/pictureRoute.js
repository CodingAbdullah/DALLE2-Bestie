const express = require("express");
const pictureController = require("../controller/PictureController");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();

router.post("/fetch-pictures", jwtAuth.verifyJWTMiddleware, pictureController.fetchMyPictures);
router.post("/insert-picture", jwtAuth.verifyJWTMiddleware, pictureController.insertPicture);
router.post("/create-picture", jwtAuth.verifyJWTMiddleware, pictureController.createAPicture);

module.exports = router;