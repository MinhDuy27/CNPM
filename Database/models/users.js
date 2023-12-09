const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersschema = new Schema({
    email: String,
    page:Number,
    money: Number,
    studentid:String,
    salt:String,
    balance:Number,
    pages:Number,
    feedback:[
        {
            content: String,
            writingday: String
        }
    ]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            
        }
    },
    timestamps: true
}
)
module.exports = mongoose.model('users',usersschema);