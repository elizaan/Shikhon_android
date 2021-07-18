const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({

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
                required: true
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
    },
    topicName:{
        type: String,
        required: true,
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

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question