'use strict';
const adminModel = require('../models/adminModel')
const MESSAGES = require('../utils/messages')
let jwt = require('jsonwebtoken');
module.exports = {
    auth: async (request, response, next) => {
        let token = request.headers.authorization;
        try {
            let decoded = await jwt.verify(token, "secret");
            let admin = await adminModel.findOne({ email: decoded.email });
            if (admin) {
                next()
            }
        } catch (error) {
            return MESSAGES.ENTER_VALID_TOKEN(response);
        }
    }
}