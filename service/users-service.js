const { userrepository } = require("../Database");
const { notfoundError, validationError } = require("../Database/side-function/app-error");
const { generatepassword, generatesignature, validatepassword, generatesalt } = require('../Database/side-function/side1');

//logic
class usersservice {
    constructor() {
        this.repository = new userrepository();
    }
    async login(userinputs) {

        const { email, password } = userinputs;
        const existingusers = await this.repository.findusers( email );
        if (!existingusers)
            throw new notfoundError("user can not be found by provided email")
        const validPassword = await validatepassword(password, existingusers.password, existingusers.salt);
        if (!validPassword)
            throw new validationError("invalid password")
        const token = await generatesignature({ email: existingusers.email, _id: existingusers._id ,studentid: existingusers.studentid});
        return { id: existingusers._id, token };
    }
    async changepassword(userinputs) {

        const { email, oldpassword, newpassword } = userinputs;
        const existingusers = await this.repository.findusers( email );
        if (!existingusers)
            throw new notfoundError("user not found by provided email")
        const validPassword = await validatepassword(oldpassword, existingusers.password, existingusers.salt);
        if (!validPassword)
            throw new validationError("invalid oldpassword")
        let userpassword = await generatepassword(newpassword, existingusers.salt);
        return await this.repository.changepassword({email,userpassword})

    }
    async signup(userinputs) {

        const { email, password, name } = userinputs;
        const existingusers = await this.repository.findusers( email );
        if (existingusers)
            throw new validationError("email was created")
        // create salt
        let salt = await generatesalt();

        let userPassword = await generatepassword(password, salt);

        const existinguser = await this.repository.createusers({ email, password: userPassword, name, salt});


        return { id: existinguser._id };
    }

    async getprofile(id) {
        
        const existinguser = await this.repository.findusersbyid( id);
        if (!existinguser) throw new notfoundError("user not found by provided id")
        return existinguser;
        
    }
    async buypaper(load){
        const {_id,number,money} = load;
        const data = await this.repository.buypaper(_id,number,money)
        return data
    }
    async sendfeedback(load){
        const {_id,content} = load;
        const data = await this.repository.sendfeedback(_id,content);
        return data;

    }
}

module.exports = usersservice;