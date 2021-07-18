const express = require('express')
const auth = require('../middleware/auth')
const Question = require('../models/Question')
const Quiz = require('../models/Quiz')
const router = express.Router()

// Add a quiz
// http://localhost:5000/quiz/add
// req.body: courseID(_id),chapterNo, author, questions(array), topicName
router.post('/quiz/add', async (req, res) => {
  // console.log("here");
  //console.log(req.body.questions[0].alternatives);
  try {
    const quiz = new Quiz({
      questions: req.body.questions,
      topicName: req.body.topicName? req.body.topicName: "combined",     //optional
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo? req.body.chapterNo: 0,     //optional
      author: req.body.author,
      totalMark: req.body.totalMark  ? req.body.totalMark : Object.keys(req.body.questions).length, //optional
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
// http://localhost:5000/quiz/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
// req.query: courseID, chapterNo
router.get('/quiz/all', async (req, res) => {
  try {
    const quizArr = await Quiz.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo})
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



// Create a quiz of some topic(topicNameArr) & specific marks
// req.query: courseID, chapterNo, topicName, totalMark
// response : quiz(a quiz)
router.get('/quiz/:totalMark', async (req, res) => {
    try {
      // const ids = [req.query.courseID]
      // console.log("hi",ids)
      // const noteArr = await Note.find({'courseID': { $in: ids} })
      const quizArr = await Quiz.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo, 'topicName': req.query.topicName})
                      .sort({ updateDate : 'descending'})
      quizArr.map((quiz) =>{
        if (quiz.totalMark === req.params.totalMark){
          res.status(200).json({
              quiz : quiz
          })
        }
        else{
          res.status(404).json({
              error: 'Select less questions',
              msg: err
            }) 
        }
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
router.get('/quiz', async (req, res) => {

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


// add a question to quiz
// req.body:  _id(quiz _id), all properties related to a question
router.post('/quiz/add-ques', auth, async (req, res) => {
  
    const question = new Question({
      topicName: req.body.topicName,
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo,
      author: req.body.author,
      description: req.body.description,
      alternatives: req.body.alternatives,
      mark: req.body.mark ? req.body.mark : 1
    })
    await question.save((err => {
      try{
        Quiz.updateOne({
          _id: req.body._id
        }, {
          $push: {
            questions: {
              ref: question._id
            }
          }
        })
        res.json({
          success: true
        })
      }catch(err){
        res.json({
          error: 'error occured in updating Quiz'
        })
      }
      
    }));
})



// remove a question from quiz
// req.query: _id(quiz _id), questionID(questionID)
router.patch("/quiz", async (req, res) => {
	try {
		const quiz = await Quiz.find({ '_id': req.query._id, 'questions._id': req.query.questionID }).populate('Question')
        // delete quiz.questions
        const index = quiz.questions.findIndex(x => x._id === req.query.questionID);

        if (index !== undefined) quiz.questions.splice(index, 1);
        console.log("After removal:", quiz.questions);

		await question.save()
		res.status(200).json({
      success: true
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})


// http://localhost:5000/quiz/all?chapterNo=2&courseID=60ad0cedb60e311790fef7c6
// delete a quiz by _id
// req.query: _id
router.delete("/quiz", async (req, res) => {
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