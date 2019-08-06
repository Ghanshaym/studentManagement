const express = require('express');
const app =  express();
const SERVER = require('./config/app')
const router = express.Router()
const mongoose = require('mongoose')
// const userRoutes =  require('./routes/admin')
const indexRoute = require('./routes/index')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

indexRoute(app);
app.listen(SERVER.PORT,()=>{
    
    mongoose.connect(SERVER.DB_PORT,SERVER.DB_URL)
    console.log("running on port no 3000");
}) 