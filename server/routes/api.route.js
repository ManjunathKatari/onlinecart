const express = require('express');
const apirouter = express.Router();
const apicategory = require('../api/api.category');
const apirole = require('../api/api.role');
const apiuser = require('../api/api.user');
const apiauth = require('../api/api.authentication');
const apiproduct = require('../api/api.product');
const apifile = require('../api/api.file');
const apistore = require('../api/api.store');

apirouter.use('/category',apicategory);
apirouter.use('/user',apiuser);
apirouter.use('/role',apirole);
apirouter.use('/auth',apiauth);
apirouter.use('/product',apiproduct);
apirouter.use('/store',apistore);
apirouter.use('/file',apifile);



module.exports = apirouter;