const express = require("express");
const pictureController = require("../controller/PictureController");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();

router.post("/fetch-pictures", jwtAuth.verifyJWTMiddleware, pictureController.fetchPictures);
router.post("/insert-picture", jwtAuth.verifyJWTMiddleware, pictureController.insertAPicture);
router.post("/create-picture", jwtAuth.verifyJWTMiddleware, pictureController.createAPicture);
router.post("/delete-picture", jwtAuth.verifyJWTMiddleware, pictureController.deleteAPicture);

module.exports = router;