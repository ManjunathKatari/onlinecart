const express = require('express');
const apirole = require('../models/role');
const httpstatus = require('http-status');

const rolerouter = express();

rolerouter.get('/', (req, res) => {
    apirole.find((err, roles) => {
        if(err){
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while fecthing all roles');
        }else{
            res.status(httpstatus.OK).json(roles);
        }
    })
}).get('/:id', (req, res) => {
    let id = req.params.id;
    apirole.findById(id, (err, role)=>{
        if(err){
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while fecthing role');
        }else{
            res.status(httpstatus.OK).json(role);
        }
    });
})
.post('/',(req, res) => {
    let body = req.body;
    let role = new apirole(body);
    role.save().then(() => {
        res.status(httpstatus.CREATED).json("Role is created.");
    }).catch((err) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json("error on while creating role");
    });
})
.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    apirole.findByIdAndUpdate(id, {name:body.name, description:body.description},
        (err, role) => {
            if(err){
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while update role');
            }else{
                res.status(httpstatus.CREATED).json('Updated');
            }
        });
})
.delete('/:id', (req, res) =>{
    let id = req.params.id;
    apirole.findByIdAndRemove(id,(err, role) => {
        if(err){
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json('error on while delete role');
        }else{
            res.status(httpstatus.CREATED).json('Role is deleted');
        }
    })
});



module.exports = rolerouter;