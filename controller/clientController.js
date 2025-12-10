const validator = require("validator");
const UserModel = require("../models/users");
const cloudinary = require("../config/cloudinary");

const createClient = async (req, res) => {
  try {
    const {
      role,
      name,
      fatherName,
      motherName,
      religion,
      email,
      cnic,
      Age,
      Gender,
      contact,
      emergencyContactNumber,
      relativeContactNumber,
      permenentAddress,
      city,
      country,
      postalCode,
      birthDate,
    } = req.body;

    let facePicture = null;

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "client",
      });

      facePicture = uploaded.secure_url;
    }

    if (
      !role ||
      !name ||
      !email ||
      !fatherName ||
      !motherName ||
      !religion ||
      !Gender ||
      !contact ||
      !cnic ||
      !Age ||
      !emergencyContactNumber ||
      !permenentAddress ||
      !city ||
      !country ||
      !postalCode ||
      !birthDate
    ) {
      return res.status(400).json({
        message: "All field required",
        data: null,
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "email is not correct",
        success: false,
      });
    }

    const client = await UserModel.create({
      role,
      cnic,
      name,
      fatherName,
      motherName,
      religion,
      email,
      Age,
      Gender,
      contact,
      emergencyContactNumber,
      permenentAddress,
      city,
      country,
      postalCode,
      birthDate,
      facePicture,
    });
    return res.status(200).json({
      message: "client date received",
      data: client,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, data: null, success: false });
  }
};

const getAllClient = async (req, res) => {
  try {
    const allclient = await UserModel.find({ role: "client" });

    return res.status(200).json({
      message: "successfull",
      data: allclient,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

const getClientByEmail = async (req, res) => {
  try {
    const clientEmail = req.body.email;
    const clientByEmail = await UserModel.findOne({ email: clientEmail });

    if (!clientByEmail) {
      return res.status(400).json({
        message: "user not found",
        data: null,
      });
    }
    if (clientByEmail?.role !== "client") {
      return res.status(400).json({
        message: "no client is available on this email",
        data: null,
      });
    }

    return res.status(200).json({
      message: "success",
      data: clientByEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const clientDeleteById = async (req, res) => {
  try {
    const gettingClientID = req.params.id;

    if (!gettingClientID) {
      return res.status(404).json({
        message: "id not found",
      });
    }

    const findClient = await UserModel.findById(gettingClientID);

    if (!findClient?.role == "client") {
      return res.status(404).json({
        message: "this id is not for client",
      });
    }
    const deleteClient = await UserModel.findByIdAndDelete(findClient);

    return res.status(200).json({
      message: "deleted",
      data: deleteClient,
    });

    return res.status(200).json({
      message: "deleted client successfully",
      data: deleteClient,
    });
  } catch (error) {
    return res.status(400).json({
      message: "something wrong",
      data: null,
    });
  }
};

module.exports = {
  createClient,
  getAllClient,
  getClientByEmail,
  clientDeleteById,
};
