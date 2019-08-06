const controller = require('../controller/teacherController');
const middleware = require('../middleware/teacher');
const middlewareAuth = require('../middleware/auth')


module.exports = (app) =>{
    app.route('/teacherSignUp').post(middlewareAuth.auth,middleware.signUp,controller.createUser)
    app.route('/teacher').get(middlewareAuth.auth,controller.find)
    app.route('/teacher/:id').get(middlewareAuth.auth,controller.findById)
    app.route('/teacher/:id').put(middlewareAuth.auth,controller.update)
    app.route('/teacher/:id').delete(middlewareAuth.auth,controller.delete)
    app.route('/teacherSubject/:id').put(middlewareAuth.auth,middleware.resources,controller.addResouces)
}