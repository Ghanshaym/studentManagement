'use strict';
const MESSAGE = require('../utils/messages')
const RESPONSE = require('../utils/message')
const MESSAGES = require('../utils/user_messages')
const studentModel = require('../models/studentModel')

module.exports = {

    studentDataSaveInDb: async (request, response) => {
        let studentInfo = new studentModel(request.body);
        try {
            await studentInfo.save()
            MESSAGE.SAVE_DATA(studentInfo, response)
        }
        catch (error) {
            MESSAGE.ERROR_SAVE_DATA(error, response)
        }
    },
    findStudents: async (request, response) => {
        let limit = Number(request.query.limit);
        let index = Number(request.query.index);
        let totalCollections = await studentModel.find().skip(index).limit(limit);
        MESSAGE.STUDENT_COLLECTION(totalCollections, response)
    },
    findById: async (request, response) => {

        try {
            let getStudent = await studentModel.findById(request.params.id);
            MESSAGE.GET_BY_ID(getStudent, response)
        } catch{
            MESSAGE.ENTER_THE_VALID_ID(response)
        }
    },
    deleteUser: async (request, response) => {

        try {
            let deleteUser = await studentModel.findByIdAndDelete(request.params.id)
            console.log(deleteUser);
            RESPONSE.RESPONSE_TRUE(deleteUser, response, MESSAGES.DELETE_USER);
        }
        catch (error) {
        }
    },
    updateUser: async (request, response) => {
        try {
            let updateUser = await studentModel.findByIdAndUpdate(request.params.id, { $set: request.body });
            RESPONSE.RESPONSE_TRUE(updateUser,response,MESSAGES.UPDATE_USER);
        }
        catch (error) {
            RESPONSE.RESPONSE_FALSE(response,MESSAGES.ERROR_UPDATE_USER)
        }
    }

}