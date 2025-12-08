

const multer =require("multer")
const path =require("path")
const fs = require("fs")

const uploadFolder =  path.join(__dirname , "../uploads")
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder, {recursive:true})
}
const storage = multer.diskStorage({
   
    destination: function (req,file ,cb){
        cb(null , uploadFolder)
    },


    filename: function (req, file ,cb){
     cb(null , Date.now()+" "+ file.originalname)         
 
    }

})


const upload = multer({storage})

module.exports =upload