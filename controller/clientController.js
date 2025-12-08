const validator = require("validator");
const UserModel = require("../models/users");
const cloudinary = require("../config/cloudinary")

const createClient = async (req, res) => {
  try {
    const {
      role,
      name,
      fatherName,
      motherName,
      siblings,
      religion,
      issueDate,
      email,
      Age,
      services,
      servicesType,
      expireDate,
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
    
       let imageUrl=null;

       if(req.file){

       const uploaded = await cloudinary.uploader.upload(req.file.path , {
          folder :"client",
        })

        imageUrl   = uploaded.secure_url
       }


        if (
      !role ||
      !name ||
      !fatherName ||
      !motherName ||
      !siblings ||
      !religion ||
      !email ||
      !Age ||
      !services ||
      !servicesType ||
      !Gender ||
      !contact ||
      !emergencyContactNumber ||
      !relativeContactNumber ||
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
      name,
      fatherName,
      motherName,
      siblings,
      religion,
      issueDate,
      email,
      Age,
      services,
      servicesType,
      expireDate,
      Gender,
      contact,
      emergencyContactNumber,
      relativeContactNumber,
      permenentAddress,
      city,
      country,
      postalCode,
      birthDate,
      imageUrl,
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
  message:"success",
  data:clientByEmail
})

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};





const clientDeleteById= async (req,res)=>{
  try {
      const  gettingClientID =  req.params.Id 
      
      if(!gettingClientID){
        return res.status(404).json({
          message:"client not found",

        })
      }
 

      const findClient = await UserModel.findById(gettingClientID)
      
          if (!client) {
      return res.status(404).json({
        message: "Client not found",
        data: null
      });
    }
      
      if(!findClient?.role=="client"){
        return res.status(404).json({
          message:"this id is not for client"
        })

      }
      const deleteClient = await UserModel.findByIdAndDelete(findClient)

      return res.status(200).json({
        message:"deleted",
        data:deleteClient
      })

      

      return res.status(200).json({
        message:"deleted client successfully",
        data:deleteClient

      })


  } catch (error) {
    return res.status(400).json({
      message:'something wrong',
      data:null
    })


  }
}

module.exports = { createClient, getAllClient, getClientByEmail, clientDeleteById };
