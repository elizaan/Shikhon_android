const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    topicList:[{
        topicNo:{
            type: Number,
        },
        topicName:{
            type: String,
            required: true,
        }
        
    }],
    courseID:{
        type: String,
        required: true,
    },
    chapterNo:{
        type: Number,
        required: true,
    }
})

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic