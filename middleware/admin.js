'use strict';
const MESSAGE = require('../utils/messages')
const Enum = require('enum')
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
module.exports = {
    login: async (request, response, next) => {
        let adminInformation = await adminModel.findOne({ email: request.body.email }) ;
    bcrypt.compare(request.body.password, adminInformation.password, (error, matchPassword) => {

        if (matchPassword) {
            const token = jwt.sign({
                email: adminInformation.email,
                _id: adminInformation._id,
            }, 'secret');
            request.adminToken = token
            next();
            // MESSAGE.LOGIN_PASSWORD_MATCH(token, response)  
        }
        else {
            MESSAGE.LOGIN_PASSWORD_NOT_MATCH(error, response);
        }

    })
        
    },

    signup: (request, response, next) => {
        let enumRole = new Enum({ admin: 'admin' });
        let adminRequestBody = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role,
        }
        if (adminRequestBody.role != enumRole.admin) {
            MESSAGE.ROLE_KEY_INVALID(request, response)
        }
        request.adminInformation = adminRequestBody;
        next()
    },
}