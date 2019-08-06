let Enum = require('enum')
let MESSAGE = require('../utils/messages')
let middleware = {}
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentmodel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel')


middleware.checkvalidations = (request, response, next) => {
    let enumRole = new Enum({ student: 'student', teacher: 'teacher', admin: 'admin' });
    let data = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role,
        subject: request.body.subject
    }
    if (data.role != enumRole.student && data.role != enumRole.teacher) {
        console.log("entre");
        MESSAGE.EMPTY_ROLE(request, response)
    }
    request.userData = data;
    next()
}
middleware.checkJwtToken = async (request, response, next) => {

    let userData = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        token: request.headers.authorization
    }
    // let decode = jwt.verify(userData.token, "secret");
    // let user = await userModel.stdentData.findOne({ "email": decode.email })||await userModel.teacherData.findOne({ "email": decode.email })
    // console.log('user = '+user);

    if (userData.firstName == undefined || userData.lastName == undefined || userData.token == '') {
        MESSAGE.ENTER_ALL_FIELDS(request, response)
    }
    request.userRequiredData = userData;
    next()
}

middleware.checkJwtTokenDeleteUser = async (request, response, next) => {
    let decode = await jwt.verify(request.headers.authorization, "secret", (error, verifyToken) => {
        if (error) {
            MESSAGE.ENTER_VALID_TOKEN(error, response)
        }
        else if (verifyToken) {
            return verifyToken;
        }
    });

    let user = await studentmodel.stdentData.findOne({ "email": decode.email }) || await studentmodel.teacherData.findOne({ "email": decode.email })
    request.userData = user;
    next()

}

middleware.Auth = async (request, response, next) => {


    let personInfo = await studentmodel.stdentData.findOne({ email: request.body.email }) || await studentmodel.teacherData.findOne({ email: request.body.email });
    bcrypt.compare(request.body.password, personInfo.password, (error, matchPassword) => {

        if (matchPassword) {
            const token = jwt.sign({
                email: personInfo.email,
                _id: personInfo._id,
            }, 'secret');
            let allRequestData = {
                personFetchData: personInfo,
                teacherSubject: request.body.subject
            }
            request.userInfo = allRequestData;
            next();
        }
        else {
            MESSAGE.LOGIN_PASSWORD_NOT_MATCH(error, response);
        }

    })
}

middleware.verifyuser = (request, response, next) => {

    if (request.userInfo.personFetchData.role != 'teacher') {
        MESSAGE.ROLE_KEY_INVALID(request, response)
    }
    request.teacherCollectionData = request.userInfo
    next()
}

module.exports = middleware;