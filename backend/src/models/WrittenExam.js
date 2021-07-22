const { Timestamp } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const Question = require('../models/Question')

const WrittenExamSchema = new mongoose.Schema({
    quizName:{
        type: String,
        required: true,
    },
    questionFile:{
        type: String,
        required: true,
    },
    time:{
        type: Number,
    },
    totalMark:{
        type: Number,
        required: true,
    },
    topicName:{
        type: String,
    },
    courseID:{
        type: String,
        required: true,
    },
    chapterName:{
        type: String,
        //required: true,
    },
    chapterNo:{
        type: Number,
        required: true,
    },
    author:{
        type : String,
        required : true,
    },
    updateDate:{
        type: Date,
        default: Date.now()
    },
    
    
    
})

const WrittenExam = mongoose.model('WrittenExam', WrittenExamSchema)

module.exports = WrittenExam