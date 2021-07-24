const express = require('express')
const mongoose = require("mongoose");
const auth = require('../middleware/auth')
const Score = require('../models/Score')
const router = express.Router()
const User = mongoose.model('User');

router.post('/score/add', async(req, res) => {
        //console.log(req.body)
        //console.log(req.user)
        try {
            const user = await User.findById(req.body.studentID);
            // console.log(user);
            const score = new Score({
                    studentID: req.body.studentID,
                    studentName: user.name,
                    quizID: req.body.quizID,
                    courseName: req.body.courseName,
                    chapterNo: req.body.chapterNo,
                    obtainedMark: req.body.obtainedMark,
                    totalMark: req.body.totalMark,
                    section: req.body.section ? req.body.section : 'Engineering'

                })
                // console.log(score);
            await score.save();
            // console.log("after");
        } catch (err) {
            res.status(400).json({
                error: 'something went wrong',
                msg: err
            })
        }
        res.json({
            success: true
        })
    })
    //For showing all quiz mark of a specific student of all course
    //param: studentID
router.get('/score/history', async(req, res) => {
    //console.log(req.body)
    try {
        const scores = await Score.find({ 'studentID': req.query.studentID })
        res.status(200).json({
            scores: scores
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
});
// For showing all student's marks of all quiz of a specific course
//param: courseName
router.get('/score/leaderboard', async(req, res) => {
    //console.log(req.query)
    try {
        const scores = await Score.aggregate(
            [{
                $group: {
                    _id: {
                        studentID: "$studentID",
                        studentName: "$studentName",
                        courseName: req.query.courseName
                    },
                    obtainedMark: { $sum: "$obtainedMark" },
                    totalMark: { $sum: "$totalMark" },
                    count: { $sum: 1 }
                }
            }]
        )

        scores.sort(function(a, b) {
                if ((a.obtainedMark / a.totalMark * 100) < (b.obtainedMark / b.totalMark * 100)) return 1;
                else return -1;
                //return (a.obtainedMark) - (b.obtainedMark);
            })
            //console.log(scores)
        res.status(200).json({
            scores: scores
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
});

//For showing highest mark of all students in a quiz
//param: quizID
router.get('/score/highest', async(req, res) => {
    console.log(req.query)
    try {

        const scores = await Score.find({ 'quizID': req.query.quizID })
        console.log(scores);
        let highest = 0
        scores.map(score => {
            if (score.obtainedMark > highest) highest = score.obtainedMark
        })

        console.log(highest);
        res.status(200).json({
            highest: highest
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
});

module.exports = router;
module.exports = router;