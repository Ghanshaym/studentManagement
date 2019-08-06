let Joi = require('joi');
const studentModel = require('../models/studentModel')
let services = {}
const MESSAGE = require('../utils/messages')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

services.schemaData = (request, response) => {
    let schema = Joi.object().keys({
        firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 1 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        role: Joi.string().regex(/^[a-zA-Z_]{3,30}$/).min(3).max(30).required(),
        subject: Joi.string().regex(/^[a-zA-Z]{3,300}$/)
    });
    return schema;
}

services.saveData = async (request, response) => {
    let userData = request;
    await userData.save((error, value) => {
        if (error) {
                     
            MESSAGE.ERROR_SAVE_DATA(error, response)
        }
        else if (value) {
            MESSAGE.SAVE_DATA(value, response)
        }
    })

}

services.Auth = async (request, response) => {
    let personInfo = await studentModel.stdentData.findOne({ email: request.email }) || await studentModel.teacherData.findOne({ email: request.email });
    bcrypt.compare(request.password, personInfo.password, (error, matchPassword) => {

        if (matchPassword) {
            const token = jwt.sign({
                email: personInfo.email,
                _id: personInfo._id,
            }, 'secret');
            MESSAGE.LOGIN_PASSWORD_MATCH(token, response);
        }
        else {
            MESSAGE.LOGIN_PASSWORD_NOT_MATCH(error, response);
        }

    })
}

services.verifyToken = async (request, response) => {

    let userData = {
        firstName: request.firstName,
        lastName: request.lastName
    }

    let decode = await jwt.verify(request.token, 'secret');
    let updateData = await studentModel.stdentData.findByIdAndUpdate(decode._id, { $set: userData }) || await studentModel.teacherData.findByIdAndUpdate(decode._id, { $set: userData });

    if (updateData) {
        MESSAGE.UPDATE_DATA(updateData, response);
    }



}

services.deleteUserData = async (request, response) => {

    let deletedUser = await studentModel.stdentData.findByIdAndDelete(request._id) || await studentModel.teacherData.findByIdAndDelete(request._id);
    if (deletedUser) {
        MESSAGE.DELETE_USER_DATA(deletedUser, response)
    }
    else if (request._id == null) {
        response.send('something went wrong');
    }
}

services.updateTeacherDataCollection = async (request, response) => {
    // console.log('request collection = '+request.personFetchData._id);
    console.log(request.teacherSubject);

    let userData = {
        subject: request.teacherSubject
    }
    updateTeacherResources = await studentModel.teacherData.findByIdAndUpdate(request.personFetchData._id, { $set: userData })
    // updateTeacherResources = await userModel.teacherData.insertMany([userData])
    console.log('update data will be = ' + updateTeacherResources);

}
module.exports = services;