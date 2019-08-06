'use strict';

const mongoose =  require('mongoose');


let admin = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {type: String, unique: true},
    password : String,
    role : String,
})

module.exports = mongoose.model('admin',admin) ;