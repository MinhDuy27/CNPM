const  ordermodel  = require("../models/order");
const  usermodel  = require("../models/users");
const { v4: uuidv4 } = require('uuid'); //generate uniq id
class orderreposittory {
    async placerequest(studentid, document, size, numberofpages, numcopies, numsides) {
    
        const current = new Date();
        const orderdatestart = current.toLocaleString();
        const orderdateend = new Date(current.setMinutes(current.getMinutes() + 1)).toLocaleString();
        const orderid = uuidv4(); 
        const order = new ordermodel({
            studentid,
            orderid,
            orderdatestart,
            orderdateend,
            status : "processing",
            document,
            size,
            numcopies,
            numsides,
            numberofpages,

        });
        const existingusers = await usermodel.findOne({studentid: studentid}).select('pages');
        existingusers.pages = existingusers.pages - parseInt(numberofpages)
        await existingusers.save();
        return await order.save();  
    }   
    async deleterequest(studentid,orderid){
        const query ={
            studentid:studentid,
            orderid:orderid
        }
        const result = await ordermodel.findOneAndDelete(query).select('numberofpages');
        const {numberofpages} = result
        const existingusers = await usermodel.findOne({studentid: studentid}).select('pages');
        existingusers.pages = existingusers.pages + parseInt(numberofpages);
        await existingusers.save();
        return result
    }
    async getorderinfor(studentid){
        return await ordermodel.find({studentid:studentid})
    }
}
module.exports = orderreposittory;