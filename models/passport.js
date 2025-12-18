const mongoose =require("mongoose")


const  passportSchema=new mongoose.Schema({

    clientID:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Users",
   
    },


   cnicFrontURL:{
    type:String,
    required:false
   },

   cnicBackURL:{
    type:String,
    required:false
   },

   degreePictureURL:{
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