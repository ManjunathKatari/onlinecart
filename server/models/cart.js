const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var cartItemSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    productId: { type: ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitPrice: { type: Number, require: true }
});

var cartSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    cartName: { type: String, required: true },
    items: [cartItemSchema], // Embedded document
    total: { type: Number, required: true },
    userId: { type: ObjectId, ref: 'users', required: true }, // reference document
    createdDate: { type: Date, default: Date.now }

}, { versionKey: false });

module.exports = mongoose.model('carts',cartSchema);