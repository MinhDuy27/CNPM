const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyschema = new Schema({
    studentid: String,
    paytime: String,
    money: Number,
    number: Number,
    status: String
},{
    toJSON: {
        transform(doc, ret){
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret._id,
            delete ret.__v;
        
        }
    },
    timestamps: true
}
)
module.exports = mongoose.model('history',historyschema);