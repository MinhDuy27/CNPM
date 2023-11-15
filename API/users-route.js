const usersservice = require("../service/users-service");
const userauth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new usersservice();
  app.post("/users/signup", async (req, res, next) => {
    try{
      const { email, password,name } = req.body;
      const   mydata   = await service.signup({ email, password, name });
     return  res.json(mydata)
    }
    catch(error){
      next(error)
    }
  });
  
  app.put("/users/changepassword",userauth, async (req, res, next) => {
    try {
      const { email,oldpassword,newpassword} = req.body;
      const   mydata   = await service.changepassword({ email,oldpassword,newpassword }); 
      return res.json(mydata)
    } catch (error) {
      next(error)
    }
      
  });

  app.post("/users/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const  data  = await service.login({ email, password });
      return res.json(data)
    } catch (error) {
      next(error)
    }
      
  });
  // get profile info
  app.get("/users/profile", userauth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const  data  = await service.getprofile( _id );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  // buy more papers
  app.post("/users/buypaper",userauth, async (req, res, next) => {
    try {
      const { studentid } = req.user;
      const {number,money} = req.body;
      const  data  = await service.buypaper({ studentid, number,money });
      return res.json(data)
    } catch (error) {
      next(error)
    }
  });

  // send feedback
  app.post("/users/feedback",userauth, async (req, res, next) => {
    try {
      const { studentid } = req.user;
      const {content} = req.body;
      const  data  = await service.sendfeedback({ studentid, content });
      return res.json(data)
    } catch (error) {
      next(error)
    }
  });

}