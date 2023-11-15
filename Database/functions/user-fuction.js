const  usersmodel  = require("../models/users");

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
    let result = await usersmodel.findOne({ email: email }); 
    return result;
}

  async changepassword({email,userpassword}){
        const query = { email: email };
        const update = { $set: { password: userpassword }};
        const options = {};
        return await usersmodel.updateOne(query, update, options)
  }
  async sendfeedback(studentid,content){
      const existingusers = await usersmodel.findOne({ studentid: studentid });
      let writingday = new Date().toLocaleString();
      const newfeedback = {
        content: content,
        date: writingday
      };
      existingusers.feedback.push(newfeedback);
      return existingusers.save();
  }
  async buypaper(studentid,numberofpages,money){
    const existingusers = await usersmodel.findOne({ studentid: studentid });
    existingusers.numberofpages += parseInt(numberofpages)
    existingusers.money -= parseInt(money)
    return existingusers.save();
  }
  async findusersbyid( id ) {
      const existingusers = await usersmodel.findById(id)
      return existingusers;
  }
  
}

module.exports = usersrepository;