const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({

    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    file: { type: String, required: true },
    categoryId: [{ type: ObjectId, ref: 'categories' }],// relation Reference Document
    createdDate: { type: Date, required: true, default: Date.now },
    updateDate: { type: Date }

}, { versionKey: false });

const products = mongoose.model('products',Product);

module.exports = products;