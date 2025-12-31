

const UserModel = require("../../models/users");

const serviceModel = require("../../models/servicesHistory");

const getClientWithService = async (req, res) => {
  try {
    const { email, cnic } = req.body;

  let client = null;

  if (email) {
    client = await UserModel.findOne({ email });
  }

  if (!client && cnic) client = await UserModel.findOne({ cnic });


if (!client) {
  return res.status(400).json({
    success: false,
    message: "client not found with this email and cnic",
    data: null,
  });
}


const service = await serviceModel.find({clientId:client._id})

if(service.length ===0){
  return res.status.json({
    success:false,
    msssage:"services not found with this client",
    data:null      
  })
}
return res.status(200).json({
  success:true,
  message:"successfully get client history",
  servicesCount:service.length,
  data:service,
}) 

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    }) 
    
  }
};



module.exports = { getClientWithService };
