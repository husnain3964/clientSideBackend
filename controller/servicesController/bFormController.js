const bFormModel = require("../../models/BForm");
const cloudinary = require("../../config/cloudinary");
const UserModel = require("../../models/users");
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

    let fatherCnicFrontPic = "";
    let fatherCnicBackPic = "";
    let motherCnicFrontPic = "";
    let motherCnicBackPic = "";

    if (fatherCnicBP) {
      const uploadFCBP = await cloudinary.uploader.upload(fatherCnicBP.path, {
        folder: "parentCnicPictureForBform",
      });
      fatherCnicBackPic = uploadFCBP.secure_url;
    }
    if (fatherCnicFP) {
      const uploadFCFP = await cloudinary.uploader.upload(fatherCnicFP.path, {
        folder: "parentCnicPictureForBform",
      });
      fatherCnicFrontPic = uploadFCFP.secure_url;
    }
    if (motherCnicFP) {
      const uploadMCFP = await cloudinary.uploader.upload(motherCnicFP.path, {
        folder: "parentCnicPictureForBform",
      });
      motherCnicFrontPic = uploadMCFP.secure_url;
    }
    if (motherCnicBP) {
      const uploadMCBP = await cloudinary.uploader.upload(motherCnicBP.path, {
        folder: "parentCnicPictureForBform",
      });
      motherCnicBackPic = uploadMCBP.secure_url;
    }

    if (
      !fatherCnicFrontPic ||
      !fatherCnicBackPic ||
      !motherCnicFrontPic ||
      !motherCnicBackPic
    ) {
      return res.status(400).json({
        success: false,
        message: "error!  uploading  in cloudiary  ",
      });
    }
    console.log(
      fatherCnicFrontPic,
      fatherCnicBackPic,
      motherCnicFrontPic,
      motherCnicBackPic,
      clientID
    );

    const uploadData = await bFormModel.create({
      clientID,
      fatherCnicFrontPic,
      fatherCnicBackPic,
      motherCnicFrontPic,
      motherCnicBackPic,
    });

    return res.status(200).json({
      success: true,
      message: "successFully uploaded data for bForm",
      data: uploadData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// create Bform API complete

// get bForm client from cnic number

const getBFormClientByCnicNumber = async (req, res) => {
  try {
    const { cnic } = req.body;
    if (!cnic) {
      return res.status(400).json({
        message: "cnic number requird",
        success: false,
        data: null,
      });
    }

    const client = await UserModel.findOne({ cnic });
    if (!client) {
      return res.status(400).json({
        message: "client not found with this cnic",
        success: false,
      });
    }

    const mergeData = await bFormModel
      .findOne({ clientID: client._id })
      .populate("clientID");

    if (!mergeData) {
      return res.status(400).json({
        message: "some error in the bFormModel Data",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      messages: "successfully get bForm data with basic Client Data",
      success: true,
      data: mergeData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
// get bForm client from cnic number completed

// get All bform client
const getAllBformClient = async (req, res) => {
  try {
    const bFormClient = await bFormModel.find().populate("clientID");
    if (!bFormClient) {
      return res.status(400).json({
        message: "BForm client not found",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      totalCLient: bFormClient.length,
      message: "successfully data Bform data recived",
      success: true,
      data: bFormClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get All client Api completed

// client delete

const bFormCLientDataDeleteByCnic = async (req, res) => {
  try {
    const { cnic } = req.body;
    if (!cnic) {
      return res.status(400).json({
        success: false,
        message: "cnic number required .!",
      });
    }
    const getClient = await UserModel.findOne({ cnic });

    if (!getClient) {
      return res.status(400).json({
        success: false,
        message: "client not found with this cnic ",
      });
    }

    const deletedata = await bFormModel.findOneAndDelete({
      clientID: getClient._id,
    });

    if (!deletedata) {
      return res.status(400).json({
        success: false,
        message: " error in deleting",
      });
    }

    return res.status(200).json({
      success: true,
      message: `B form client data deleted`,
      data: deletedata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete api completed

// update
const updateBformClientfromId  = async (req, res) => {
  try {
        const {id} = req.params
     
     if(!id){
      return res.status(400).json({
        success:false,
        message:"id required for update data", 

      })
     }
        
    const data = await bFormModel.findById(id)
    if(!data){
      return res.status(400).json({
        message:"Bform data not found with this id",
        success:false,
      })
    }

    const updateBformData = {}

    const FCFP = req.files?.fatherCnicFrontPic?.[0];
    const FCBP = req.files?.fatherCnicBackPic?.[0];
    const MCFP = req.files?.motherCnicFrontPic?.[0];
    const MCBP = req.files?.motherCnicBackPic?.[0];

    
    if(FCFP){
      const uploadFCFP = await cloudinary.uploader.upload
      (FCFP.path , {
        folder:"parentCnicPictureForBform"
      })
       updateBformData.fatherCnicFrontPic= uploadFCFP.secure_url  

    }

    if(FCBP){
      const uploadFCBP = await  cloudinary.uploader.upload(
        FCBP.path,{
          folder:"parentCnicPictureForBform"
        }

      )
      updateBformData.fatherCnicBackPic = uploadFCBP.secure_url
    }
    if(MCFP){
      const uploadMCFP = await cloudinary.uploader.upload (
        MCFP.path ,{
          folder:"parentCnicPictureForBform"
        }
      ) 
      updateBformData.motherCnicFrontPic = uploadMCFP.secure_url
    }      
    if(MCBP){
      const uploadMCBP  = await cloudinary.uploader.upload(
        MCBP.path,{
          folder:"parentCnicPictureForBform"
        }
      )
      updateBformData.MCBP=uploadMCBP.secure_url
    }


     if(req.body.clientID){
      updateBformData.clientID = req.body.clientID;
     }
  
  const updateddata =await  bFormModel.findByIdAndUpdate(id ,
    updateBformData, {
    new:true,
    runValidators:true
  }) 

  if(!updateddata){
    return res.status(400).json({
      message:"error in update",
      success:false,
      data:null
    })
  }
   return res.status(200).json({
    message:"successfully update data",
    success:true,
    data:updateddata

   })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:error.message,
    });
  }
};

// BForm CRUD completed 
// createBForm , 
// UpdateBForm,
// DeleteBForm
// getAllBFormClient
// getSingleBformClientBycnic

module.exports = {
  createBform,
  getBFormClientByCnicNumber,
  getAllBformClient,
  bFormCLientDataDeleteByCnic,
  updateBformClientfromId
};
