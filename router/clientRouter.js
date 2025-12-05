const express= require("express");
const {createClient} =require("../controller/clientController")
const {getAllClient} =require("../controller/clientController")
const {getClientByEmail}  =require("../controller/clientController")
const {clientDeleteById}  =require("../controller/clientController")
const router=express.Router()


router.post("/createClient" , createClient)
router.get("/getAllClient",getAllClient )
router.get("/getclientByEmail",getClientByEmail )
router.get("/clientDeleteById/:id",clientDeleteById )


module.exports =router

