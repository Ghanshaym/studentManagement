let personData = {}
const joi = require('joi')
const service = require('../services/service')
const MESSAGE = require('../utils/messages')
const bcrypt = require('bcrypt')
const studentModel = require('../models/studentModel')
const teacherModel = require('../models/teacherModel')
personData.createUser = (request, response) => {
    let person_data = request.userData;
    joi.validate(person_data, service.schemaData(), (error, value) => {
        if (error) {
            MESSAGE.INVALID_JOI(error, response)
        }
        else {
            person_data.password = bcrypt.hashSync(person_data.password, 2);
            if (person_data.role == 'student') {
                let userSaveData = new studentModel(person_data)
                service.saveData(userSaveData, response)
            }
            else if (person_data.role == 'teacher') {
                let userSaveData = new teacherModel(person_data)
                service.saveData(userSaveData, response)
            }
        }
    })
}
personData.logIn = (request, response) => {

    service.Auth(request.body, response)
}

personData.updateuserData = (request, response) => {

    service.verifyToken(request.userRequiredData, response)

}

personData.deleteuserData = (request, response) => {
    if (request.userData == null) {

        MESSAGE.ENTER_VALID_TOKEN(request.userData, response);
    }
    service.deleteUserData(request.userData, response)
}

personData.updateTeacherResources = (request,response) =>{
    service.updateTeacherDataCollection(request.teacherCollectionData)
}
module.exports = personData