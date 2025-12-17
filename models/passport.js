const mongoose =require("mongoose")


const  passportSchema=new mongoose.Schema({

    clientID:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Users",
   
    },


   cnicFrontPic:{
    type:String,
    required:false
   },

   cnicBackPic:{
    type:String,
    required:false
   },

   degreePicture:{
    type:String,
    required:false
   },

    service:{
    type:String,
    default:"newPassport"
    
   },
   




})



const passportModel =  mongoose.model("PASSPORT" , passportSchema)
module.exports = passportModel