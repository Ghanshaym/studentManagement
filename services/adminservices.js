const Joi = require('joi');
const MESSAGE = require('../utils/messages')
module.exports = {
    adminSchema :(request,response)=>{
        let schema = Joi.object().keys({
            firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            email: Joi.string().email({ minDomainAtoms: 1 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            role: Joi.string().regex(/^[a-zA-Z_]{3,30}$/).min(3).max(30).required(),
            subject: Joi.string().regex(/^[a-zA-Z]{3,300}$/)
        });
        return schema;
    },
    adminDataSaveInDb :async (request,response)=>{
         let admininfo = request;
         await admininfo.save((error, value) => {
            if (error) {
                         
                MESSAGE.ERROR_SAVE_DATA(error, response)
            }
            else if (value) {
                MESSAGE.SAVE_DATA(value, response)
            }
        })
            
    }

}