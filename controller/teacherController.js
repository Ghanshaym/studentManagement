'use strict';
let services = require('../services/teacherService')

module.exports = {
    createUser :async (request,response)=>{
    services.teacherDataSaveInDb(request,response)
    },
    find : async (request,response) => {
        services.find(request,response)
    },
    findById : async(request,response)=>{
        services.findById(request,response)
    },
    update : async (request,response)=> {
        services.update(request,response)
    },
    delete : async (request,response)=> {
        services.delete(request,response)
    },
    addResouces : async (request,response) => {
        services.resources(request,response)
    }
}