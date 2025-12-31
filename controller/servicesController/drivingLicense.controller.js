const licencesModel = require("../../models/drivingLicense");

const createDrivingLicense = async (req, res) => {
  try {
    const { clientId, licenseType } = req.body;

    if (!clientId || !licenseType) {
      return res.status(400).json({
        message: "All field must be required",
      });
    }

    const getLicData = await licencesModel.create({
      clientId,
      licenseType,
    });

    if (!getLicData) {
      return res.status(400).json({
        message: "ERROR! data did not upload",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "successFully uploaded data",
      data: getLicData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports={createDrivingLicense}
