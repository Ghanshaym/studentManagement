module.exports = {
    RESPONSE_TRUE :(request,response,message)=> {
             let responseUserData = {
                 statusCode  : 200,
                 meassage : message,
                 data : request
             }
             response.json(responseUserData)
    },
    RESPONSE_FALSE :(response,message)=> {
        let responseUserData = {
            statusCode  : 400,
            message : message
        }
        response.json(responseUserData);
}

}