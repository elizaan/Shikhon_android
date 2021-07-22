const express = require('express')
const auth = require('../middleware/auth')
const Question = require('../models/Question')
const Quiz = require('../models/WrittenExam')
const router = express.Router()

// Add a quiz
// http://localhost:5000/quiz/add
// req.body: courseID(_id),chapterNo, author, questions(array), topicName
router.post('/quiz/written/add', async (req, res) => {
  // console.log("here");
  //console.log(req.body.questions[0].alternatives);
  try {
    const quizes = await Quiz.find({'courseID': req.body.courseID , 'chapterNo': req.body.chapterNo, 'topicName': req.body.topicName});
    let cnt = quizes.length + 1;
    let name = "Written Test " + cnt.toString();

    const quiz = new Quiz({
      quizName: name,
      questionFile: req.body.questionFile,
      topicName: req.body.topicName? req.body.topicName: "combined",     //optional
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo? req.body.chapterNo: 0,     //optional
      author: req.body.author? req.body.author: "Unknown",
      totalMark: req.body.totalMark  ? req.body.totalMark : 50, //optional
      time: req.body.time ? req.body.time : 900
    })

    await quiz.save()
    res.json({
        success: true,
    })

  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
  
  
})

// Get all quiz of a chapter
// http://localhost:5000/quiz/written/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2&topicName=Noukar Math
// req.query: courseID, chapterNo, topicName
router.get('/quiz/written/all', async (req, res) => {
    try {
      const quizArr = await Quiz.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo, 'topicName': req.query.topicName})
                      .sort({ updateDate : 'descending'})
       
      res.status(200).json({
        quizArr : quizArr
      })
    } catch (err) {
      res.status(400).json({
        error: 'something went wrong',
        msg: err
      })
    }
  });

// Get a quiz 
// http://localhost:5000/quiz?_id=60b01137d76821469c27fcc8
// req.query: _id
// response: quiz
router.get('/quiz/written/one', async (req, res) => {
    console.log("he")
    try {
      const quiz = await Quiz.findById(req.query._id)
      res.status(200).json({
        quiz : quiz
      })
    } catch (err) {
      res.status(400).json({
        error: 'something went wrong',
        msg: err
      })
    }
  });

// param: _id, body: content,topicName,i time, totalMark
router.patch("/quiz/written", async (req, res) => {
	try {
		const quiz = await Quiz.findOne({ _id: req.query._id })
    
    if (req.body.questionFile) quiz.questionFile = req.body.questionFile
	if (req.body.topicName) quiz.topicName = req.body.topicName
    if (req.body.time) quiz.time = req.body.time
    if (req.body.totalMark) quiz.totalMark = req.body.totalMark
		 
    await quiz.save()
    
	res.status(200).json({
        quiz : quiz
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})

// http://localhost:5000/quiz/written?chapterNo=2&courseID=60ad0cedb60e311790fef7c6
// delete a quiz by _id
// req.query: _id
router.delete("/quiz/written", async (req, res) => {
    // console.log("here in quiz delete");
      try {
          await Quiz.deleteOne({ '_id': req.query._id })
          res.status(204).json({
              success: true
          })
      } catch {
          res.status(400).json({
              error: 'something went wrong',
              msg: err
            })
      }
  })
module.exports = router;