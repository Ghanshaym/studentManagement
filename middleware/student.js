'use strict';
const MESSAGE = require('../utils/messages')
const Enum = require('enum')
const studentModel = require('../models/studentModel')
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const services = require('../services/studentServices')
const controller = require('../controller/teacherController')


module.exports = {
    find: (request, response, next) => {
        console.log(request.query.index);
        next();
    },
    findById: (request, response, next) => {
        next();
    },
    create: (request, response, next) => {
        next();
    },
    update: (request, response, next) => {
        let updatedRequest = request.body;
        let schema = Joi.object().keys({
            firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
        });

        Joi.validate(updatedRequest, schema, (error, same) => {
            if (error) {
                MESSAGE.INVALID_JOI(error, response);
            } else {
                    next()
            }
        })
    },
    delete: (request, response, next) => {
        next();
    },
     signUp: async (request, response, next) => {
        let studentInfo = request.body;
        let schema = Joi.object().keys({
            firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            email: Joi.string().email({ minDomainAtoms: 1 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            role: Joi.string().valid('student').required()
        });

        Joi.validate(studentInfo, schema, (error, same) => {
            if (error) {
                MESSAGE.INVALID_JOI(error, response);
            } else {
                    next()
            }
        })

    },


    verifyAdmin: async (request, response, next) => {
        let userAndAdminRequestBody = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role,
            token: request.headers.authorization
        }
        let decode = jwt.verify(token, "secret");
        let Admin = await adminModel.findOne({ "email": decode.email });
        if (Admin.role == 'admin') {
            console.log('enter');
            request.studentInformation = userAndAdminRequestBody;
            next();
        }
        for (let i in userAndAdminRequestBody) {
            if (userAndAdminRequestBody[i] == undefined) {
                MESSAGE.ENETER_THE_VALID_DATA(userAndAdminRequestBody[i], response);
            }
        }

        // let adminInformation = await adminModel.findOne({ email: request.body.adminEmail }) ;
        // bcrypt.compare(request.body.adminEmailPassword, adminInformation.password, (error, matchPassword) => {

        //     if (matchPassword) {                
        //         request.studentInformation = userAndAdminRequestBody ;
        //         next();
        //     }
        //     else {
        //         MESSAGE.LOGIN_PASSWORD_NOT_MATCH(error, response);
        //     }

        // })
    }

}