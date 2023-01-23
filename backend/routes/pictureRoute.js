const express = require("express");
const pictureController = require("../controller/PictureController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/fetch-pictures", auth, pictureController.fetchMyPictures);
router.post("/insert-picture", auth, pictureController.insertPicture);

module.exports = router;