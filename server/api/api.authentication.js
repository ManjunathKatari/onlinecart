const express = require('express'),
    httpstatus = require('http-status'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');

const user = require('../models/user');
const role = require('../models/role');

const apiauthen = express();
var superSecret = 'dotnettricks';

apiauthen.post('/', (req, res) => {
    let body = req.body;
    
    user.findOne({email:body.email, password:body.password})
        .select('_id name contact email password roles')
        .populate('roles')
        .exec((err, userdata) => {
            if(err){
                res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
            }

            if(userdata != undefined && userdata != null){
                var roles = [];
                for(let i = 0; i < userdata.roles.length; i++){
                    roles.push(userdata.roles[i].name);
                }
                //if user found make the token

                const token = jwt.sign({
                    email:userdata.email,
                    password:userdata.password,
                    roles:roles
                },superSecret,{expiresIn: 1440 * 60})

                //res.status(httpstatus.OK).json(token);

                const authobj = {
                    userId: userdata._id,
                    email: userdata.email,
                    name: userdata.name,
                    contact: userdata.contact,
                    roles: roles,
                    token: token
                } 
                res.status(httpstatus.OK).json(authobj);
            }else{
                res.status(httpstatus.NOT_FOUND).json('not found');
            }

        })

});

module.exports = apiauthen;