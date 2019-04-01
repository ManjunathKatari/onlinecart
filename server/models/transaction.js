const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var transaction = new Schema({
    _id: { type: ObjectId, auto: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
    paymentType: { type: String },
    userId: { type: ObjectId, ref: 'users', required: true },
    cartId: { type: Object, ref: 'carts', required: true },
    amount: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    updateDate: Date

}, { versionKey: false });

module.exports = mongoose.model('transactions',transaction);