const adminController = {}
const MESSAGE = require('../utils/messages')
const services = require('../services/adminservices')
const joi = require('joi')
const bcrypt = require('bcrypt')
const adminModel = require('../models/adminModel')
module.exports = {
    signUp: (request, response) => {
        let adminInfo = request.adminInformation;
        joi.validate(adminInfo, services.adminSchema(), (error, value) => {
            if (error) {
                MESSAGE.INVALID_JOI(error, response)
            }
            else {
                adminInfo.password = bcrypt.hashSync(adminInfo.password, 2);
                if (adminInfo.role == 'admin') {
                    let adminRequiredInfo = new adminModel(adminInfo)
                    services.adminDataSaveInDb(adminRequiredInfo, response)
                }
            }
        })
    },
    login: async (request, response) => {
        MESSAGE.LOGIN_PASSWORD_MATCH(request.adminToken, response);
    }
}