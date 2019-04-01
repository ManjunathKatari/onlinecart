const express = require('express');
const multer = require('multer');
const httpstatus = require('http-status');
const path = require('path');
const filerouter = express.Router();
const filepath =  path.join(__dirname,'../../client/src/assets/images');

var abspath = '';

var storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, filepath);
    },
    filename: (req, file, callback) => {
        const arr = file.originalname.split('.');
        const fileext = arr[arr.length -  1];
        const filename = file.fieldname + '-' + Date.now() + '.' + fileext;
        abspath = '../assets/images' + "/" + filename;
        callback(null, filename);
    }
});

const upload = multer({
    storage:storage
}).single('file');

filerouter.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json(err);
            return;
        }else{
            res.status(httpstatus.OK).json({filepath:abspath});
            
        }
    });
});

module.exports = filerouter;