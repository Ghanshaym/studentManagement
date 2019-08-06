const controller = require('../controller/adminController');
const middleware = require('../middleware/admin');

module.exports = (app)=>{
    
    app.route('/signUp').post(middleware.signup,controller.signUp);
    app.route('/login').post(middleware.login,controller.login)
}