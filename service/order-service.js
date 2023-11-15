const { orderrepository } = require("../Database");

//logic
class orderservice {
    constructor() {
        this.repository = new orderrepository();
    }
    async placerequest({load}){
        const {studentid,document,size,numberofpages } = load;
        const result = await this.repository.placerequest(studentid,document,size,numberofpages)
        return result
    }
    async deleterequest({load}){
        const {studentid,orderid} = load;
        const result = await this.repository.deleterequest(studentid,orderid)
        return result
    }
    async gerorderinfor(userid){
        return await this.repository.getorderinfor(userid)
    }
}

module.exports = orderservice;