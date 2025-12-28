const serviceModel = require("../../models/servicesHistory")

const  UserModel=require('../../models/users')
const cnicModel=require('../../models/cnic')
const serviceModel = require("../../models/servicesHistory")


const getClientWithService = async(req ,res)=>{


    const {email , cnic} = req.body;
     

 let client=null;


 if(email){
    client = await  UserModel.findOne({email})
    
 };

 if(!client && cnic)
   
    client

}
