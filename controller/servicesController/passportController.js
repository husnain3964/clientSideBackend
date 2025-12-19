const passportModel = require("../../models/passport");
const cloudinary = require("../../config/cloudinary");
const UserModel = require("../../models/users");

const createPassport = async (req, res) => {
  try {
    const { clientID } = req.body;

    if (!clientID) {
      return res.status(400).json({
        message: "required client ID!",
        success: false,
      });
    }

    const cnicFrontPic = req.files?.cnicFrontPic?.[0];
    const cnicBackPic = req.files?.cnicBackPic?.[0];
    const degreePic = req.files?.degreePicture?.[0];

    if (!cnicBackPic || !cnicFrontPic || !degreePic) {
      return res.status(400).json({
        message: "required all required document picture",
        success: false,
      });
    }
    // console.log(cnicBackPic , cnicFrontPic , degreePic)
    let cnicFrontURL = "";
    let cnicBackURL = "";
    let degreePictureURL = "";

    if (cnicFrontPic) {
      const uploadFrontCnicPic = await cloudinary.uploader.upload(
        cnicFrontPic.path,
        {
          folder: "docPicForPassport",
        }
      );

      cnicFrontURL = uploadFrontCnicPic.secure_url;
    }

    if (cnicBackPic) {
      const UploadBackCnicPic = await cloudinary.uploader.upload(
        cnicBackPic.path,
        {
          folder: "docPicForPassport",
        }
      );
      cnicBackURL = UploadBackCnicPic.secure_url;
    }
    if (degreePic) {
      const uploadDegreePic = await cloudinary.uploader.upload(degreePic.path, {
        folder: "docPicForPassport",
      });
      degreePictureURL = uploadDegreePic.secure_url;
    }

    if (!degreePictureURL || !cnicBackURL || !cnicFrontURL) {
      return res.status(400).json({
        success: false,
        messages: "cloudinary path error",
        data: null,
      });
    }
    console.log(degreePictureURL, cnicBackURL, cnicFrontURL);

    const passport = await passportModel.create({
      clientID,
      cnicFrontURL,
      cnicBackURL,
      degreePictureURL,
    });
    return res.status(200).json({
      success: true,
      message: "successfully added record passport data!",
      data: passport,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// collect All  new passsport customer

const getAllPassportApplication = async (req, res) => {
  try {
    const allApplicationData = await passportModel.find().populate("clientID");
    if (!allApplicationData) {
      return res.status(400).json({
        success: false,
        message: "error ! not getting data",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All passport Client data recived",
      data: allApplicationData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// getAllcnic application api completed

// get passport client by cnic  api work start

const getPassportclientByCnic = async (req, res) => {
  try {
    const { cnic } = req.body;
    
    if (!cnic) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "required cnic number",
      });
    }

    const client = await UserModel.findOne({ cnic });

    if (!client) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "required cnic number",
      });
    }

    const getpassportClientByclientID = await passportModel
      .findOne({ clientID: client._id })
      .populate("clientID");

    if (!getpassportClientByclientID) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "error !  merging data problem",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};
// get passport client by cnic  api completed

//update passport APIs started from here
const updatePassportdetailById = async (req, res) => {
  const { id } = req.params;
  
  
  if (!id) {
    return res.status(400).json({
      message: "id required for update",
      success: null,
      data: null,
    });
  }


  const passportData =await passportModel.findOne({_id:id});
  try {
    if (!passportData) {
      return res.status(400).json({
        message: `passport data not found with this ID ${id}`,
        success: false,
      });
    }

    const UpdatePassportData = {};

    const cnicFront = req.files?.cnicFrontPic?.[0];
    const cnicBack = req.files?.cnicBackPic?.[0];
    const degreePicture = req.files?.degreePicture?.[0];

    if (cnicFront) {
      const uploadFront = await cloudinary.uploader.upload(cnicFront.path, {
        folder: "docPicForPassport",
      });

      UpdatePassportData.cnicFrontURL = uploadFront.secure_url;
    }

    if (cnicBack) {
      const uploadBack = await cloudinary.uploader.upload(cnicBack.path, {
        folder: "docPicForPassport",
      });
      UpdatePassportData.cnicBackURL = uploadBack.secure_url;
    }

    if (degreePicture) {
      const uploadDegree = await cloudinary.uploader.upload(degreePicture.path, {
        folder: "docPicForPassport",
      });
      UpdatePassportData.degreePictureURL = uploadDegree.secure_url;
    }

    if (req.body.clientID) {
      UpdatePassportData.clientID = req.body.clientID;
    }
    
    const updatePassport = await passportModel.findByIdAndUpdate(
      id,
      UpdatePassportData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "successfully update passport data",
      data: updatePassport,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};  
//update passport APIs completed


//  complete passport APIs   70%
// We need to add more passport clients
// Check the "Get All Clients" APIs
// Check the "Get Passport Client by CNIC Number" API
// Task: Create the updatePassport API

module.exports = {
  createPassport,
  getAllPassportApplication,
  getPassportclientByCnic,
  updatePassportdetailById,
};
