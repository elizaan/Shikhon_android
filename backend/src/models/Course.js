const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        //trim: true,
        unique: true
    },
    
    chapters:{
        type:[{
            chapterName: String,
            chapterNo: Number,
            notes:{
                type:[{
                    noteId: Number,
                    topicName: String,
                    content: String,
                    uploadDate: {
                        type: Date,
                        default: Date.now()
                    },
                    author: String,

                }]
            },
            videos:{
                type:[{
                    topicName: String,
                    content: String,
                    uploadDate: {
                        type: Date,
                        default: Date.now()
                    },
                    author: String,
                }]
            }

        }]

    },
    teacher:{
        type:[{
            teacherName: String,
        }]
    }

})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course