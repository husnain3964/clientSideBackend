const mongoose = require("mongoose");
const { schema } = require("./passport");

const bformSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  fatherCnicFrontPic: {
    type: String,
    required: false,
  },

  fatherCnicBackPic: {
    type: String,
    required: false,
  },

  motherCnicFrontPic: {
    type: String,
    required: false,
  },

  motherCnicBackPic: {
    type: String,
    required: false,
  },
  service: {
    type: String,
    default: "BForm",
  },
});

const bFormModel = mongoose.model("BForm", bformSchema);
module.exports = bFormModel;
