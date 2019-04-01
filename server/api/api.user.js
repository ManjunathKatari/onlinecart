const express = require('express');
const mongoose = require('mongoose');
const apiuser = require('../models/user');
const apirole = require('../models/role');
const httpstatus = require('http-status');

const userrouter = express();

userrouter.get('/', (req, res) => {
    apiuser.find((err, users) => {
        if (err) {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while fetching users');
        } else {
            res.status(httpstatus.OK).json(users);
        }
    });
})
    .get('/:id', (req, res) => {
        let id = req.params.id;
        apiuser.findById(id, (err, user) => {
            if (err) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while fetching user');
            } else {
                res.status(httpstatus.OK).json(user);
            }
        });
    })
    .post('/', (req, res) => {
        let body = req.body;
        const obj = new apiuser(body);
        apirole.findOne({ name: body.role }, (err, r1) => {
            if (err) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while fetching role to create user');
            } else {
                
                obj.roles.push(r1);
                obj.save().then(() => {
                    let _id = mongoose.Types.ObjectId(obj._id);
                    r1.users.push(_id);
                    apirole.findByIdAndUpdate(r1._id, { users: r1.users }, (err, r2) => {
                        if (err) {
                            res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while a update role');
                        } else {
                            res.status(httpstatus.CREATED).json('User is created');
                        }
                    });
                }).catch((err) => {
                    res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while a create user');
                });


            }
        })

    })
    .put('/:id', (req, res) => {
        let data = req.body;
        let id = req.params.id;
        apiuser.findByIdAndRemove(id, { name: data.name, address: data.address }, (err, user) => {
            if (err) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while update user');
            } else {
                res.status(httpstatus.OK).json('User is updated');
            }
        });
    })
    .delete('/:id', (req, res) => {
        let id = req.params.id;
        apiuser.findByIdAndRemove(id, (err, user) => {
            if (err) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while delete user');
            } else {
                res.status(httpstatus.OK).json('User is deleted');
            }
        });
    });


module.exports = userrouter;

