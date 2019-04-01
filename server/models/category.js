const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    categories:[{type:ObjectId, ref:'categories'}],
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false });

const categories = mongoose.model('categories', Category);
module.exports = categories;
