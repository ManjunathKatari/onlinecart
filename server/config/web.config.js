const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/db_shoppingcart',(err) => {
    if(err != null)
        console.log("Error while connectiong Mongo Database: " + err);
})

module.exports = connection;