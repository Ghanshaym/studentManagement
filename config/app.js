module.exports = {
    PORT : process.env.SERVER_PORT || '3000',
    DB_PORT : process.env.SERVER_PORT || 'mongodb://localhost:27017/student_teacher_db',
    DB_URL : process.env.SERVER_PORT || { useNewUrlParser: true }
}