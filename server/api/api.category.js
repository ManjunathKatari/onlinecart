const express = require('express');
const apicategory = require('../models/category');
const httpstatus = require('http-status');

const categoryrouter = express.Router();

categoryrouter
    .get('/', (req, res) => {
        apicategory.find().then((docs) => {
            res.status(httpstatus.OK).send(docs);
        }).catch((err) => {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        })
    })
    .get('/:id', (req, res) => {
        let id = req.params.id;
        apicategory.findById(id).then((doc) => {
            res.status(httpstatus.CREATED).send(doc)
        }).catch((err) => {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        })
    })
    .post('/', (req, res) => {
        let body = req.body;
        if (body != null && body != undefined) {
            let category = new apicategory(body);
            category.save().then(() => {
                res.status(httpstatus.CREATED).send("Category is created.");
            }).catch((err) => {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            })
        }

    }).put('/:id', (req, res) => {
        let id = req.params.id;
        if (id != null && id != undefined) {
            let body = req.body;
            
            apicategory.findByIdAndUpdate(id, {name:body.name, description:body.description}).then(() => {
                res.status(httpstatus.CREATED).send("Category is updated.");
            }).catch((err) => {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            })
        }
    })
    .delete('/:id', (req, res) => {
        let id = req.params.id;
        if (id != null && id != undefined) {
            apicategory.findByIdAndRemove(id).then(() => {
                res.status(httpstatus.OK).send("Category is deleted.");
            }).catch((err) => {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            })
        }
    });

module.exports = categoryrouter;