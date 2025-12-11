const express = require("express");
const {
  createCnic,
} = require("../controller/servicesController/cnicController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/cnic",
  upload.fields([
    { name: "frontPicture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  createCnic
);

module.exports = router;
