
const studentRoute =  require('./studentRoute')
const admin = require('./admin')
const teacherRoute = require('./teacherRoutes')

module.exports = (app)=>{
 studentRoute(app);
  admin(app);
  teacherRoute(app);
};