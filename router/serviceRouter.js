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
  updatePassportdetailById,
} = require("../controller/servicesController/passportController");
const {
  createBform,
  getBFormClientByCnicNumber,
  getAllBformClient,
  bFormCLientDataDeleteByCnic,
  updateBformClientfromId,
} = require("../controller/servicesController/bFormController");
const { getVehicleData, updateVehicleData } = require("../controller/servicesController/vehicleController");

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

router.get("/allPassport", getAllPassportApplication);
router.post("/PassportByCnic", getPassportclientByCnic);

router.put(
  "/passportUpdate/:id",
  upload.fields([
    { name: "cnicFrontPic", maxCount: 1 },
    { name: "cnicBackPic", maxCount: 1 },
    { name: "degreePicture", maxCount: 1 },
  ]),
  updatePassportdetailById
);

// /////////////////////////////////////////BFORM

router.post(
  "/Bform",
  upload.fields([
    { name: "fatherCnicFrontPic", maxCount: 1 },
    { name: "fatherCnicBackPic", maxCount: 1 },
    { name: "motherCnicFrontPic", maxCount: 1 },
    { name: "motherCnicBackPic", maxCount: 1 },
  ]),
  createBform
);

router.post("/getbForm", getBFormClientByCnicNumber);
router.get("/AllbForm", getAllBformClient);
router.get("/deletebForm", bFormCLientDataDeleteByCnic);

router.put(
  "/updatebForm/:id",
  upload.fields([
    { name: "fatherCnicFrontPic", maxCount: 1 },
    { name: "fatherCnicBackPic", maxCount: 1 },
    { name: "motherCnicFrontPic", maxCount: 1 },
    { name: "motherCnicBackPic", maxCount: 1 },
  ]),
  updateBformClientfromId
);



// vehicle routing 


router.post('/createVehicleRegistration' , getVehicleData)

router.put("/updateVehicleData" , updateVehicleData )


module.exports = router;
