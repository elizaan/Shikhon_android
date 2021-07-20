const express = require('express')
const auth = require('../middleware/auth')
const Question = require('../models/Question')
const router = express.Router()


// req.body: courseID(_id),chapterNo, author, content, topicName
router.post('/question/add', async (req, res) => {
  // console.log("hi")
  // console.log(req.body)
  //console.log(req.user)
  try {
    const question = new Question({
      topicName: req.body.topicName,  //note Name
      noteID: req.body.noteID ? req.body.noteID : "",  //new
      shortSolution: req.body.shortSolution ? req.body.shortSolution : "Solve yourself",  //new
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo,
      author: req.body.author,
      description: req.body.description,
      alternatives: req.body.alternatives,
      mark: req.body.mark ? req.body.mark : 1
    })
    await question.save();
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
// http://localhost:5000/question/chap-all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
// req.body: courseID, chapterNo
// Get all questions of a chapter
router.get('/question/chap-all', async (req, res) => {
  // console.log("question/chap-all e ashche");
  try {
    
    const quesArr = await Question.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo})
                    .sort({ updateDate : 'descending'})
    
    res.status(200).json({
      quesArr : quesArr
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});
// http://localhost:5000/question/topic-all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2&topicName=নদী ও নৌকা
// find all questions under a topic of a chapter
// req.body: courseID, chapterNo, topicName
router.get('/question/topic-all', async (req, res) => {
    try {
      // const ids = [req.query.courseID]
      // console.log("hi",ids)
      // const noteArr = await Note.find({'courseID': { $in: ids} })
      const quesArr = await Question.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo, 'topicName': req.query.topicName})
                      .sort({ updateDate : 'descending'})
      //console.log(noteArr)
      
      res.status(200).json({
        quesArr : quesArr
      })
    } catch (err) {
      res.status(400).json({
        error: 'something went wrong',
        msg: err
      })
    }
  });
// http://localhost:5000/question?_id=60c5ca79a56b970a64971587
// Get a question by _id
// req.body: _id
router.get('/question', async (req, res) => {

  try {
    const question = await Question.findById(req.query._id)
    res.status(200).json({
      question : question
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});

// http://localhost:5000/question?_id=60c5ca79a56b970a64971587
// ref.query: _id
// ref.body: topicName, alternatives, description, chapterNo (What you want to update , pass only that)
router.patch("/question", async (req, res) => {
	try {
		const question = await Question.findOne({ _id: req.query._id })
    
    if (req.body.description) question.description = req.body.description
    if (req.body.alternatives) question.alternatives = req.body.alternatives
		if (req.body.chapterNo) question.chapterNo = req.body.chapterNo
		if (req.body.topicName) question.topicName = req.body.topicName
    if (req.body.noteID) question.noteID = req.body.noteID
    if (req.body.shortSolution) question.shortSolution = req.body.shortSolution
		 
    await question.save()
    
		res.status(200).json({
      question : question
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})
// http://localhost:5000/question?_id=60c5ca79a56b970a64971587
// delete a question by _id
// req.query: _id
router.delete("/question/", async (req, res) => {
  // console.log("in question delete");
	try {
		await Question.deleteOne({ _id: req.query._id })
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