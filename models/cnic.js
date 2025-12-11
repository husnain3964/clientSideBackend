const mongoose =require("mongoose")


const  cnicSchema=new mongoose.Schema({

    clientID:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"client",
   
    },


   cnicFrontPic:{
    type:String,
    required:false
   },

   cnicBackPic:{
    type:String,
    required:false
   },

   fatherCnicPicFront:{
    type:String,
    required:false
   },

   fatherCnicPicBack:{
    type:String,
    required:false
   },
   




})



const cnicModel =  mongoose.model("CNIC" , cnicSchema)
module.exports = cnicModel