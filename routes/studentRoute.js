const controller =  require('../controller/studentController');
const middleware = require('../middleware/student')
const middlewareAuth = require('../middleware/auth')
module.exports=(app)=> {

    app.route('/studentSignUp').post(middlewareAuth.auth,middleware.signUp,controller.createUser)
    app.route('/findStudent').get(middlewareAuth.auth,controller.findStudents)
    app.route('/findStudent/:id').get(middlewareAuth.auth,controller.findById)
    app.route('/update/:id').put(middlewareAuth.auth,middleware.update,controller.updateUser)
    app.route('/delete/:id').get(middlewareAuth.auth,controller.deleteUser)
}