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


//                                              y  continue    
//  complete passport APIs   70% 
// We need to add more passport clients
// Check the "Get All Clients" APIs
// Check the "Get Passport Client by CNIC Number" API
// Task: Create the updatePassport API

module.exports = {
  createPassport,
  getAllPassportApplication,
  getPassportclientByCnic,
};
