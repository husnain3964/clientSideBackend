const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
       role: {
      type: String,
      enum: ["admin", "user", "client"],
      default: "user",
    },

    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: function () {
        if (this.role == "client") {
          return false;
        } else {
          return true;
        }
      },
      unique: true,
    },
    password: {
      type: String,
      require: function () {
        if (this.role == "client") {
          return false;
        } else {
          return true;
        }
      },
    },
 
   

    // for client Side detail

    Age: {
      type: String,
      require: false,
    },

    fatherName: {
      type: String,
      require: false,
    },

    motherName: {
      type: String,
      require: false,
    },
    cnic: {
      type: String,
      require: false,
    },


    religion: {
      type: String,
      require: false,
    },

  
   
    Gender: {
      type: String,
      enum: ["male", "female"],
    },

    contact: {
      type: String,
      require: false,
    },
    emergencyContactNumber: {
      type: String,
      require: false,
    },
   

    permenentAddress: {
      type: String,
      require: false,
    },

    city: {
      type: String,
      require: false,
    },
    country: {
      type: String,
      require: false,
    },
    postalCode: {
      type: String,
      require: false,
    },

    birthDate:{
      type:Date,
      require:false,
    },

    facePicture: {
      type: String,
      require: false,
    },
   
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
