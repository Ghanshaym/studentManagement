'use strict';

const mongoose = require('mongoose');
let teacher = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    teacherSubject: { type: String },
    role: { type: String },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'subject' }
})

module.exports = mongoose.model('teacher',teacher);