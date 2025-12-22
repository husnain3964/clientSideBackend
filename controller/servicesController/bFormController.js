const bFormModel = require("../../models/BForm");
const cloudinary = require("../../config/cloudinary");
const createBform = async (req, res) => {
  try {
    const { clientID } = req.body;

    if (!clientID) {
      return res.status(400).json({
        message: "clientId must be Required",
        success: false,
      });
    }

    const fatherCnicFP = req.files?.fatherCnicFrontPic?.[0];
    const fatherCnicBP = req.files?.fatherCnicBackPic?.[0];
    const motherCnicFP = req.files?.motherCnicFrontPic?.[0];
    const motherCnicBP = req.files?.motherCnicBackPic?.[0];

    if (!fatherCnicFP || !fatherCnicBP || !motherCnicFP || !motherCnicBP) {
      return res.status(400).json({
        message: "error in cnic's picture",
        success: false,
      });
    }

    const fatherCnicFrontPic = "";
    const fatherCnicbBackPic = "";
    const motherCnicFrontPic = "";
    const motherCnicBackPic = "";

    if (fatherCnicBP) {
      const uploadFCBP = await cloudinary.uploader.upload(fatherCnicBP.path, {
        folder: "parentCnicPictureForBform",
      });
      fatherCnicbBackPic = uploadFCBP.secure_url;
    }
    if (fatherCnicFP) {
      const uploadFCFP = cloudinary.uploader.upload(fatherCnicFP.path, {
        folder: "parentCnicPictureForBform",
      });
      fatherCnicFrontPic = uploadFCFP.secure_url;
    }
    if (motherCnicFP) {
      const uploadMCFP = cloudinary.uploader.upload(motherCnicFP.path, {
        folder: "parentCnicPictureForBform",
      });
      motherCnicFrontPic = uploadMCFP.secure_url;
    }
    if (motherCnicBP) {
      const uploadMCBP = cloudinary.uploader.upload(motherCnicBP.path, {
        folder: "parentCnicPictureForBform",
      });
      motherCnicBackPic = uploadMCBP.secure_url;
    }

    if(!fatherCnicFrontPic || !fatherCnicbBackPic || !motherCnicBackPic || !motherCnicBackPic){
        return res.status(400).json({
            success: false,
            message: "error!  uploading  in cloudiary  "
        })
    }
  console.log(fatherCnicFrontPic , fatherCnicbBackPic  , motherCnicFrontPic , motherCnicBackPic , clientID)

    const uploadData = await bFormModel.create({
        clientID , 
        fatherCnicFrontPic,
        fatherCnicbBackPic,
        motherCnicFrontPic,
        motherCnicBackPic
    })
    
    return res.status(200).json({
        success :true,
        message:"successFully uploaded data for bForm",
        data: uploadData
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


module.exports = {createBform}