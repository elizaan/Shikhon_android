const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    quizName: {
        type: String,

    },
    quizID: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    totalMark: {
        type: Number,
        required: true,
    },
    obtainedMark: {
        type: Number,
        required: true,
    },
    Section: {
        type: String,
    },
    chapterNo: {
        type: Number,
    }

})

const Score = mongoose.model('Score', ScoreSchema)

module.exports = Score