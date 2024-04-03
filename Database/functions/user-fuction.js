const  usersmodel  = require("../models/users");
const historymodel = require("../models/history");
class usersrepository {
  async createusers({ email,password,name,salt }) {
    
      const users = new usersmodel({
        email,
        password,
        name,
        studentid:"123456",
        salt,
        balance:20000,
        pages:50
      });
      return await users.save();
    
  }

  async findusers( email ) {
    let result = await usersmodel.findOne({ email: email }).lean(); 
    return result;
}

  async changepassword({email,userpassword}){
        const query = { email: email };
        const update = { $set: { password: userpassword }};
        const options = {};
        return await usersmodel.updateOne(query, update, options)
  }
  async sendfeedback(_id,content){
      const existingusers = await usersmodel.findById(_id).select('feedback');
      let writingday = new Date().toLocaleString();
      const newfeedback = {
        content,
        writingday
      };
      existingusers.feedback.push(newfeedback);
      return existingusers.save();
  }
  async buypaper(_id,number,money){
    const existingusers = await usersmodel.findById(_id).select('balance pages');
    existingusers.balance = existingusers.balance - parseInt(money)
    existingusers.pages = existingusers.pages + parseInt(number)
    const history = new historymodel({
      studentid:_id,
      paytime:new Date().toLocaleString(),
      number:number,
      money:money,
      status:"paid"
    });
    await history.save();
    return existingusers.save();
  }
  async findusersbyid( id ) {
      const existingusers = await usersmodel.findById(id);
      return existingusers;
  }
  async buypaper_history( id ) {
    const history = await historymodel.find({studentid:id})
    return history;
}
  
}

module.exports = usersrepository;