let message = {}

message.EMPTY_ROLE = (request, response) => {

    let userResponseData = {
        statusCode: 400,
        message: "your role key does not match"
    }
    response.json(userResponseData);
}

message.INVALID_JOI = (request, response) => {
    let userResponseData = {
        statusCode: 400,
        message: 'please enter the valid data',
        data: request
    }
    response.json(userResponseData)
}

message.ERROR_SAVE_DATA = (request, response) => {
    let userResponseData = {
        statusCode: 400,
        message: 'you data will not save because of some errors',
        error: request
    }
    response.json(userResponseData);
}

message.SAVE_DATA = (request, response) => {
    let userResponseData = {
        statusCode: 200,
        mesaage: 'your data will be save',
        data: request
    }
    response.json(userResponseData);
}

message.LOGIN_PASSWORD_NOT_MATCH = (request,response)=>{
    let userResponseData = {
        statusCode: 400,
        mesaage: 'your email and password does not match',
        data: request
    }
    response.json(userResponseData);
}

message.LOGIN_PASSWORD_MATCH = (request,response)=>{
    let userResponseData = {
        statusCode: 200,
        mesaage: 'your are loggedIn',
        token: request
    }
   return response.json(userResponseData);
}

message.ENTER_ALL_FIELDS = (request,response)=>{
    let userResponseData = {
        statusCode: 400,
        mesaage: 'please check your firstName,lastName,token',
    }
    response.json(userResponseData);
}

message.ENTER_VALID_TOKEN = (response)=>{
    let userResponseData = {
        statusCode: 400,
        mesaage: 'please enter the valid token',
    }
   return response.json(userResponseData);
}

message.UPDATE_DATA = (request,response)=>{
    let userResponseData = {
        statusCode : 200,
        message : "your data will be updated",
        updateData  : request
    } 
  return  response.json(userResponseData);
}

message.DELETE_USER_DATA = (request,response)=>{
    let userResponseData = {
        statusCode : 200,
        message : "your data will be deleted",
        updateData  : request
    } 
  return  response.json(userResponseData);
}

message.ROLE_KEY_INVALID = (request,response)=>{
    let userResponseData = {
        statusCode : 400,
        message : "please enter the valid role key  ",
    } 
  return  response.json(userResponseData);
}

message.ENETER_THE_VALID_DATA = (request,response)=>{
    let userResponseData = {
        statusCode : 400,
        message : "you can enter empty data",
        data : request
    } 
  return  response.json(userResponseData);
}

message.STUDENT_COLLECTION = (request,response)=>{
    let userResponseData = {
        statusCode : 200,
        message : "student data collection",
        data : request
    } 
  return  response.json(userResponseData);
}

message.GET_BY_ID = (request,response)=>{
    let userResponseData = {
        statusCode : 200,
        message : "student data ",
        data : request
    } 
  return  response.json(userResponseData);
}

message.ENTER_THE_VALID_ID = (response)=>{
    let userResponseData = {
        statusCode : 400,
        message : " please enter the valid ID",
    } 
  return  response.json(userResponseData);
}
module.exports = message; 