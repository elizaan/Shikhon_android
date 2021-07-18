const { Timestamp } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const Question = require('../models/Question')

const QuizSchema = new mongoose.Schema({

    questions:
    [
        {
            description:{
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: false
            },
            alternatives: [
                {
                    text: {
                        type: String,
                        // required: true
                        required: false
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                        default: false
                    },
                    image: {
                        type: String,
                        required: false
                    },
                }
            ],
            mark:{
                type: Number,
                default: 1,
            }
        }
    ],
    
    totalMark:{
        type: Number,
        required: true,
    },
    topicName:{
        type: String,
        // required: true,
        //trim: true,
        //unique: true
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

const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = Quiz