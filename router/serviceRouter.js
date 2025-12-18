const express = require("express");
const {
  createCnic,
  getAllClientWithCnic,
  getCnicClientByCnicNumber,
  updateCnic,
} = require("../controller/servicesController/cnicController");

const upload = require("../middleware/upload");
const {
  createPassport,
  getAllPassportApplication,
  getPassportclientByCnic,
} = require("../controller/servicesController/passportController");

const router = express.Router();

router.post(
  "/cnic",
  upload.fields([
    { name: "frontPicture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  createCnic
);

router.get("/getAllCnic", getAllClientWithCnic);
router.post("/getClientCnicNumber", getCnicClientByCnicNumber);

router.put(
  "/cnic/:cnicID",
  upload.fields([
    { name: "frontPicture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  updateCnic
);

// passport router


router.post(
  "/passport",
  upload.fields([
    { name: "cnicFrontPic", maxCount: 1 },
    { name: "cnicBackPic", maxCount: 1 },
    { name: "degreePicture", maxCount: 1 },
  ]),
  createPassport
);


router.get("/allPassport" , getAllPassportApplication)
router.post("/PassportByCnic" ,getPassportclientByCnic)
module.exports = router;
