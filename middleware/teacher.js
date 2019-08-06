'use strict';
const Joi = require('joi');
const MESSAGE = require('../utils/messages')
const RESPONSE = require('../utils/message')
const MESSAGES = require('../utils/user_messages')
module.exports = {
    signUp: async (request, response, next)=> {
        let studentInfo = request.body;
        let schema = Joi.object().keys({
            firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            email: Joi.string().email({ minDomainAtoms: 1 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            role: Joi.string().valid('teacher').required()
        });
        Joi.validate(studentInfo, schema, (error, same) => {
            if (error) {
                MESSAGE.INVALID_JOI(error, response);
            } else {
                    next()
            }
        })
    },
    resources : async(request,response,next)=>{
        let subject = request.body ;
        let schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        Joi.validate(subject, schema, (error, same) => {
            if (error) {
                RESPONSE.RESPONSE_FALSE(response,MESSAGES.VALIDATION_ERROR);
            } else {
                    next()
            }
        })
    }
   

}