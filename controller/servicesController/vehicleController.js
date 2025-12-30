const UserModel = require("../../models/users");
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

const deleteVehileDataByCnic = async (req, res) => {
  try {
    const { cnic } = req.body;
    if (!cnic) {
      return res.status(400).json({
        success: false,
        message: "cnic number required",
      });
    }

    const client = await UserModel.findOne({ cnic });

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "client not found with this cnic",
      });
    }

    console.log(client._id);
    const deleteVehicleData = await vehicleModel.findOneAndDelete({
      clientId: client._id,
    });

    if (!deleteVehicleData) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "successfully deleted  this veicle data",
      data: deleteVehicleData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete api completed

//get all vehicle data with client
const getAllVehicleData = async (req, res) => {
  try {
    const getVehicleData = await vehicleModel.find().populate("clientId");

    return res.status(200).json({
      success: true,
      message: "succes fully got data",
      data: getVehicleData,
      count: getVehicleData.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// getAllvehicleData APIs completed

// getvehicledatabycnic
const getVehicleDataByCnic = async (req, res) => {
  try {
    const { cnic } = req.body;
    if (!cnic) {
      return res.status(400).json({
        message: " ERROR!  cnic number must be required",
      });
    }

    const findClientbyCnic = await UserModel.findOne({ cnic });
    if (!findClientbyCnic) {
      return res.status(400).json({
        message: "ERROR! client not found with this cnic number",
      });
    }

    const gettingSingleVehicleData = await vehicleModel
      .findOne({
        clientId: findClientbyCnic._id,
      })
      .populate("clientId");
      
  if(!gettingSingleVehicleData){
    return res.status(400).json({
      message:"ERROR! data not found with this clientID"
    })
  }

      return res.status(200).json({
        success:true,
        message:"successfully got data",
        data:gettingSingleVehicleData
      })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

//  created vehicle registration schema linked with client ID
//  implemented create and update vehicle registration APIs
// verified both APIs are working correctly
//  delete APi completed!
//  getAllVehicleData  API completed!
//  getvehicleDataBycnic  completed !
    
//   vehicle rigistration  CRUD completed!

module.exports = {
  getVehicleData,
  updateVehicleData,
  deleteVehileDataByCnic,
  getAllVehicleData,
  getVehicleDataByCnic
};
