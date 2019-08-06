'use strict';

const mongoose = require('mongoose');
const SERVER = require('../config/app')
const Schema = mongoose.Schema;
mongoose.connect(SERVER.DB_PORT, SERVER.DB_URL);

let studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    subject: String,
})

module.exports = mongoose.model("studentSchema", studentSchema);

