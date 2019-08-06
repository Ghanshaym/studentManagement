'use strict';
const MESSAGE = require('../utils/messages')
const services = require('../services/studentServices')
const joi = require('joi')
const bcrypt = require('bcrypt')
const studentModel = require('../models/studentModel')
const service = require('../services/studentServices')
module.exports = {
    createUser: async (request, response) => {
        service.studentDataSaveInDb(request,response);
    },
    findStudents : async(request,response) => {
      service.findStudents(request,response)
    },
    findById : async(request,response)=>{
        service.findById(request,response)
    },
    deleteUser : async(request,response)=>{

        service.deleteUser(request,response)
    },
    updateUser : async(request,response)=>{
        service.updateUser(request,response)
    }
}