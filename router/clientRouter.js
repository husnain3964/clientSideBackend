const express= require("express");
const {createClient} =require("../controller/clientController")
const {getAllClient} =require("../controller/clientController")
const {getClientByEmail}  =require("../controller/clientController")
const {clientDeleteById}  =require("../controller/clientController")

const upload = require("../middleware/upload")

const router = express.Router()


router.post("/createClient" ,upload.single("facePicture") ,createClient)
router.get("/getAllClient",getAllClient )
router.get("/getclientByEmail",getClientByEmail )
router.get("/clientDeleteById/:id",clientDeleteById )






module.exports =router

