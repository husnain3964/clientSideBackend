const cnicModel = require("../../models/cnic")

const cloudinary = require("../../config/cloudinary")


const createCnic= async(req, res) =>{
    try {
        
    const { clientID  }  = req.body

    if(!clientID){
        return res.status(400).json({
            success:false,
            message:" required Client id"
        })
    }
       
    
    const frontPicture = req.files?.frontPicture?.[0]
    const backPicture = req.files?.backPicture?.[0]


let  frontUrl="";
let  backUrl="";

if(frontPicture){
   const uploadfrontUrl = await  cloudinary.uploader.upload(
        frontPicture.path,
        {folder:"Cnic"}
    )
    frontUrl = uploadfrontUrl.secure_url
}

if(backPicture){
   const uploadBackUrl = await  cloudinary.uploader.upload(
        backPicture.path,
        {folder:"Cnic"}
    )
    backUrl = uploadBackUrl.secure_url
}




 const cnic= await cnicModel.create({
    clientID,
    fatherCnicPicBack:backUrl,
    fatherCnicPicFront:frontUrl
 })
return res.status(200).json({
    success:true,
    message:"data recived for new cnic",
    data:cnic
})



    } catch (error) {
        return  res.status(500).json({
            success:false,
            message:"something went wrong",
            data:null
        
        })
    }
}


module.exports = {createCnic}