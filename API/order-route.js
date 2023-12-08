const orderservice = require("../service/order-service.js");
const userauth = require("./middlewares/auth");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Uploaded-file/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);  
    }
  });
  const upload = multer({
    storage: storage,
  });

module.exports =  (app) =>{
    const service = new orderservice();

    // send printing request
    app.post("/order/printing",userauth,upload.single('orderfile'), async (req, res, next) => {
      try{
          const {studentid } = req.user;
          const document = req.file.originalname;
          var {size, numberofpages, numcopies, numsides} = req.body;
          const   mydata   = await service.placerequest({ studentid, document, size, numberofpages, numcopies, numsides });
          return  res.json(mydata)
        }
        catch(error){
          next(error)
        }
    });
    app.delete("/order/printing/delete",userauth, async (req,res,next)=>{
      try {
          const {studentid} = req.user;
          const {orderid} = req.body;
          const mydata = await service.deleterequest(studentid,orderid);
          return  res.json(mydata)
      } 
      catch (error) {
        next(error)
      }
    })
    //get order information
    app.get("/order/infor",userauth,async(req, res, next)=>{
        try {
            const {studentid} = req.user;
            const data = await service.gerorderinfor(studentid);
            return res.json(data);
        } catch (error) {
          
        }
    })
};