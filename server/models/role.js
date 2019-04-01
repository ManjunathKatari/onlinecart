const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Role = new Schema({
    _id: { type: ObjectId, auto: true },
    name:{type:String, required:true},
    description:{type:String},
    createdDate:{type:Date, default:Date.now},
    users:[{type:ObjectId, ref:'users'}]

},{skipVersioning:true, versionKey:false});

var roles = mongoose.model('roles',Role);

module.exports = roles;