const  ordermodel  = require("../models/order");
const   usermodel  = require("../models/order");
const { v4: uuidv4 } = require('uuid'); //generate uniq id
class orderreposittory {
    async placerequest(studentid,document,size,numberofpages) {
    
        const orderdate = new Date().toLocaleString();
        const orderid = uuidv4(); 
        const order = new ordermodel({
            studentid,
            orderid,
            orderdate,
            status : "processing",
            document,
            size,
            numberofpages,

        });
        const existingusers = await usermodel.findOne({studentid: studentid});
        existingusers.pages -= parseInt(numberofpages);
        await existingusers.save();
        return await order.save();  
    }   
    async deleterequest(studentid,orderid){
        const query ={
            studentid:studentid,
            orderid:orderid
        }
        const result = await ordermodel.findOneAndDelete(query);
        const existingusers = await usermodel.findOne({studentid: studentid});
        existingusers.pages += parseInt(numberofpages);
        await existingusers.save();
        return result
    }
    async getorderinfor(studentid){
        return await ordermodel.findOne({studentid:studentid})
    }
}
module.exports = orderreposittory;