const express = require("express");
const pictureController = require("../controller/PictureController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/fetch-pictures", auth.auth, pictureController.fetchMyPictures);
router.post("/insert-picture", auth.auth, pictureController.insertPicture);
router.post("/create-picture", auth.auth, pictureController.createAPicture);

module.exports = router;