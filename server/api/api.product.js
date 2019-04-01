const express = require('express');
const apiproduct = require('../models/product');
const apicategory = require('../models/category');
const httpstatus = require('http-status');
const productrouter = express.Router();

productrouter
.get('/',(req, res) => {
    apiproduct.find((err, docs) => {
        if(err)
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        else{
            return res.status(httpstatus.OK).json(docs);
        }
    })
})
.post('/', (req, res) => {
    let body = req.body;
    const product = new apiproduct(body);
    apicategory.findOne({'name' : body.category}, (err, cat) => {
        if(err){
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        }else{ 

            product.categoryId.push(cat);
            product.save()
            .then(() => {
                return res.status(httpstatus.CREATED).json('Product is created.');
            })
            .catch((err) => {
                return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
            })
        }
    })
})
.get('/:id', (req, res) => {
    let id = req.params.id;
    apiproduct.findById(id,(err, doc) => {
        if(err)
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        else{
            return res.status(httpstatus.OK).json(doc);
        }
    })
})
.put('/:id' , (req, res) => {
    let id = req.params.id;
    apiproduct.findByIdAndUpdate(id,{name:req.body.name, unitPrice:req.body.unitPrice, file:req.body.file}
        ,(err, doc) => {
        if(err)
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        else{
            return res.status(httpstatus.OK).json('Product is updated.');
        }
    });
})
.delete('/:id', (req, res) => {
    let id = req.params.id;
    apiproduct.findByIdAndRemove(id,(err,doc) => {
        if(err){
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
        }           
        else{
            return res.status(httpstatus.OK).json('Product is deleted.');
        }
    });
});

module.exports = productrouter;