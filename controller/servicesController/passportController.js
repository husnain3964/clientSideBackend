const passportModel = require("../../models/passport")
const cloudinary = require("../../config/cloudinary")

const createPassport = async (req, res)=>{
    try {
        const  {clientID} = req.body

        if(!clientID){
            return res.status(400).json({
                message:"required client ID!",
                success:false
            })
        }
        

        const cnicFrontPic = req.files?.cnicFrontPic?.[0]
        const cnicBackPic = req.files?.cnicBackPic?.[0]
        const degreePic = req.files?.degreePicture?.[0]
        

    if(!cnicBackPic || !cnicFrontPic || !degreePic){
        return res.status(400).json({
                message:"required all required document picture",
                success:false
            })
    }

    // if(cnicFrontPic){
    //     const uploadFrontCnicPic
    // }                                                 continue

    } catch (error) {
        
    }
}



module.exports={createPassport}