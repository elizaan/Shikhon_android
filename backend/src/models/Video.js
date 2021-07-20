const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
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
    content:{
        type: String,
        required: true,
    }
    
})

const Video = mongoose.model('Video', VideoSchema)

module.exports = Video