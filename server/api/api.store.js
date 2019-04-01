const express = require('express');
const httpstatus = require('http-status');

const storerouter = express.Router();

const product = require('../models/product');
const cart = require('../models/cart');
const order = require('../models/order');
const transaction = require('../models/transaction');

storerouter
.get('/', (req, res) => {
    product.find((err, docs) => {
        if(err){
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        }else{
            return res.status(httpstatus.OK).json(docs);
        }
    });
})
.get('/:id', (req, res) => {
    let id = req.params.id;
    product.findById(id, (err, doc) => {
        if(err){
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        }else{
            return res.status(httpstatus.OK).json(doc);
        }
    });
})
.post('/cart', (req, res) => {
    let body = req.body;
    body.createdDate = new Date();
    const obj = new cart(body);
    obj.save()
    .then(() => {
        return res.status(httpstatus.CREATED).json({id:obj._id})
    })
    .catch((err) => {
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
    });
})
.post('/paymentstatus', (req, res) => {
    let objpayment = req.body;
    console.log(objpayment);
    let obj = {
        cartId: objpayment.udf1,
        userId: objpayment.udf2,
        amount: objpayment.amount,
        paymentType: objpayment.mode,
        status: objpayment.status,
        transactionId: objpayment.txnid,
        createdDate: new Date()
    };

    let objTransaction = new transaction(obj);
    objTransaction.save((err) => {
        if(err){
            res.json(err);
        }else{
            if(obj.status == 'success'){
                cart.findById(obj.cartId, (carterror, cartdoc) => {
                    if(carterror){
                        res.json(carterror);
                    }else{
                        let cartobj = {
                            cartId: cartdoc._id,
                            items: cartdoc.items,
                            total: cartdoc.total,
                            userId: cartdoc.userId,
                            createdDate:new Date()
                        };

                        let orderobj = new order(cartobj);
                        orderobj.save((ordereror) => {
                            if (error) {
                                res.json(error);
                            } else {
                                let receiptObj = {
                                    name: objPayment.firstname,
                                    email: objPayment.email,
                                    transactionId: objPayment.txnid,
                                    amount: objPayment.amount,
                                    status: objPayment.status
                                };
                                req.session.receipt = receiptObj;
                                res.redirect('/receipt');
                            }
                        });
                    }
                });
            }
            else {
                let receiptObj = {
                    name: objpayment.firstname,
                    email: objpayment.email,
                    transactionId: objpayment.txnid,
                    amount: objpayment.amount,
                    status: objpayment.status
                };
                req.session.receipt = receiptObj;
                res.redirect('/receipt');
            }
        }
    });
})



module.exports = storerouter;