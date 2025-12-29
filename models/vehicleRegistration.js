  const mongoose = require("mongoose");

  const vehicleRegistrationSchema = new mongoose.Schema(
    {
      clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },

      vehicleMake: {
        type: String,
        required: true,
      },
      vehicleModelNumber: {
        type: String,
        required: true,
      },
      vehicleRegistrationNumber: {
        type: String,
        required: true,
        unique:true
      },
      vehicleName: {
        type: String,
        required: true,
              },
    },

    { timestamps: true }
  );
  const vehicleModel = mongoose.model("VehiclesData", vehicleRegistrationSchema);
  module.exports = vehicleModel;
