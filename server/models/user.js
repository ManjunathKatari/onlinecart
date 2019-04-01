const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    createdDate: { type: Date, default: Date.now },
    roles: [{ type: ObjectId, ref: 'roles', required: true }]

}, { skipVersioning:true, versionKey: false });

const users = mongoose.model("users",User);
module.exports = users;