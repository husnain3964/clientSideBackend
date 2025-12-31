const mongoose = require("mongoose");

const drivingLicenseSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    licenseType: {
      required: true,
      type: String,
      enum: ["heavyVehicle", "motorCycle", "car"],
    },
  },
  { timestamps: true }
);

const licencesModel = mongoose.model("DrivingLicense", drivingLicenseSchema);
module.exports = licencesModel;
