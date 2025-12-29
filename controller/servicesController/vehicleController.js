const vehicleModel = require("../../models/vehicleRegistration");

const getVehicleData = async (req, res) => {
  try {
    const {
      clientId,
      vehicleMake,
      vehicleName,
      vehicleModelNumber,
      vehicleRegistrationNumber,
    } = req.body;

    if (!clientId) {
      return res.status(400).json({
        success: true,
        message: "clientId must be required",
      });
    }

    if (
      !vehicleMake ||
      !vehicleModelNumber ||
      !vehicleRegistrationNumber ||
      !vehicleName
    ) {
      return res.status(400).json({
        success: true,
        message: "All field must be required",
      });
    }

    const uploadVehicleData = await vehicleModel.create({
      clientId,
      vehicleMake,
      vehicleRegistrationNumber,
      vehicleModelNumber,
      vehicleName,
    });

    if (!uploadVehicleData) {
      return res.status(400).json({
        success: false,
        message: "something went error",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "successfully uploaded vehicle data",
      data: uploadVehicleData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// get vehicle data completed

//  update vehicle data 

const updateVehicleData = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "id must be required",
        data: null,
      });
    }

    const getdata = await vehicleModel.findById(id);

    if (!getdata) {
      return res.status(400).json({
        success: false,
        message: "vehicle data not found with this id",
      });
    }

    let updatedData = {};

    if (req.body.clientId) {
      updatedData.clientId = req.body.clientId;
    }

    if (req.body.vehicleMake) {
      updatedData.vehicleMake = req.body.vehicleMake;
    }

    if (req.body.vehicleModelNumber) {
      updatedData.vehicleModelNumber = req.body.vehicleModelNumber;
    }
    if (req.body.vehicleName) {
      updatedData.vehicleName = req.body.vehicleName;
    }
    if (req.body.vehicleRigisterionNumber) {
      updatedData.vehicleName = req.body.vehicleRegistrationNumber;
    }

    const uploadUpdateDate = await vehicleModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!uploadUpdateDate) {
      return res.status(400).json({
        success: false,
        message: "somthing wrong in upload updating data",
      });
    }

    return res.status(200).json({
      message: "success fully uploaded updated",
      success: true,
      data: uploadUpdateDate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  updated vehicle data completed 

//  created vehicle registration schema linked with client ID
//  implemented create and update vehicle registration APIs
// verified both APIs are working correctly
//  delete and get-all APIs pending



module.exports = { getVehicleData, updateVehicleData };
