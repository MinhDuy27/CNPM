const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderschema = new Schema({
    studentid: String,//unique
    orderid: String,//unique
    orderdate:String,
    status: String,
    document: String,
    size: String,
    numberofpages: Number,
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;      
        }
    },
    timestamps: false
}
);

module.exports =  mongoose.model('order', orderschema);