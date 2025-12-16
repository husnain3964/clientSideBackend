const express = require("express");
const {
  createCnic,
  getAllClientWithCnic,
  getCnicClientByCnicNumber
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

router.get("/getAllCnic" ,getAllClientWithCnic)
router.post("/getClientCnicNumber" ,getCnicClientByCnicNumber)

module.exports = router;
