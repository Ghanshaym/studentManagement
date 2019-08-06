'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subject = new Schema({
    name: {type:String},
    email : {type : String , unique : true } ,
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }
})
subject.pre('save',async (next) =>{
    let data = await mongoose.model('teacher').findOne({subjectId : this._id})
    if(data){
        console.log(data);
        let update = await mongoose.model('subject').updateOne({$set : {email : data.email}})
        console.log('update = ',update);
    
    }
}) 

module.exports = mongoose.model('subject', subject); 