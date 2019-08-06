'use strict';
const teacherModel = require('../models/teacherModel')
const MESSAGE = require('../utils/messages')
const RESPONSE = require('../utils/message')
const MESSAGES = require('../utils/user_messages')
const subjectModel = require('../models/subjectModel')

module.exports = {
    teacherDataSaveInDb: async (request, response) => {
        let teacherInformation = new teacherModel(request.body);
        try {
            await teacherInformation.save()
            MESSAGE.SAVE_DATA(teacherInformation, response)
        }
        catch (error) {
            MESSAGE.ERROR_SAVE_DATA(error, response)
        }
    },
    find: async (request, response) => {
        let limit = Number(request.query.limit);
        let index = Number(request.query.index);
        let totalCollections = await teacherModel.find().skip(index).limit(limit);
        MESSAGE.STUDENT_COLLECTION(totalCollections, response)
    },
    findById: async (request, response) => {
        try {
            let getStudent = await teacherModel.findById(request.params.id);
            MESSAGE.GET_BY_ID(getStudent, response)
        } catch{
            MESSAGE.ENTER_THE_VALID_ID(response)
        }
    },
    update: async (request, response) => {
        try {
            let updateUser = await teacherModel.findByIdAndUpdate(request.params.id, { $set: request.body });
            RESPONSE.RESPONSE_TRUE(updateUser, response, MESSAGES.UPDATE_USER);
        }
        catch (error) {
            RESPONSE.RESPONSE_FALSE(response, MESSAGES.ERROR_UPDATE_USER)
        }
    },
    delete: async (request, response) => {

        try {

            let deleteUser = await teacherModel.findByIdAndDelete(request.params.id)
            RESPONSE.RESPONSE_TRUE(deleteUser, response, MESSAGES.DELETE_USER);
        }
        catch (error) {
            RESPONSE.RESPONSE_FALSE(response, MESSAGES.DELETE_USER)
        }
    },
    resources: async (request, response) => {
        try {
            let teacherInfo = await teacherModel.findOne({ _id: request.params.id })
            let checkUniqueEmailInfo = await subjectModel.findOne({ email: teacherInfo.email });
            if (teacherInfo && checkUniqueEmailInfo == null) {
                let teacherResources = await new subjectModel(request.body);
                teacherResources.email = teacherInfo.email;
                await teacherResources.save()
                MESSAGE.SAVE_DATA(teacherResources, response)
            }
            else {
                RESPONSE.RESPONSE_FALSE(response, MESSAGES.ALREADY_USED)
            }
        }
        catch (error) {
            console.log(error);
            MESSAGE.ERROR_SAVE_DATA(error, response)
        }

    }

}