const { orderrepository } = require("../Database");

//logic
class orderservice {
    constructor() {
        this.repository = new orderrepository();
    }
    async placerequest(load){
        const {studentid,document,size,numberofpages,numcopies,numsides } = load;
        const result = await this.repository.placerequest(studentid,document,size,numberofpages,numcopies,numsides);
        return result
    }
    async deleterequest(studentid,orderid){
        const result = await this.repository.deleterequest(studentid,orderid)
        return result
    }
    async gerorderinfor(studentid){
        return await this.repository.getorderinfor(studentid)
    }
}

module.exports = orderservice;