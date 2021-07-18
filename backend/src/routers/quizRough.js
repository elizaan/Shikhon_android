const express = require('express')
const auth = require('../middleware/auth')
const Question = require('../models/Question')
const Quiz = require('../models/QuizRough')
const router = express.Router()


// req.body: courseID(_id),chapterNo, author, content, topicName
router.post('/quiz/add', async (req, res) => {
  //console.log(req.body)
  //console.log(req.user)
  id_list =[]
  try {
    console.log("start")
    try{
      await Promise.all(req.body.questions.map(async (ques) =>new Promise((resolve)=>{
        const question = new Question({
          topicName: ques.topicName,
          courseID: ques.courseID,
          chapterNo: ques.chapterNo,
          author: ques.author,
          description: ques.description,
          alternatives: ques.alternatives,
          mark: ques.mark ? ques.mark : 1
        })
        resolve(question.save((err) =>{
          if (err) {
            console.log("error inside: ",err)
            return handleError(err);
          }
          console.log("inside question.save")
          // id_list.push(question._id)
          id_list.push("hi")
        }));
        console.log("outside question.save")
      })))//,async()=>{
    }catch (err) {
      res.status(400).json({
        error: 'something went wrong here',
        msg: err
      })
    }
    
    console.log("hi list",id_list)
    const quiz = new Quiz({

      questions: id_list,
      topicName: req.body.topicName? req.body.topicName: "combined",     //optional
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo? req.body.chapterNo: 0,     //optional
      author: req.body.author,
      totalMark: req.query.totalMark  ? req.body.totalMark : Object.keys(req.body.questions).length, //optional
    })
    console.log("hi list2",id_list)
    await quiz.save()
    
  // });

  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
  res.json({
      success: true,
      _idlist: id_list
    })
  
})
// Get all quiz of a chapter
// http://localhost:5000/quiz/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
// req.query: courseID, chapterNo
router.get('/quiz/all', async (req, res) => {
  try {
    // const ids = [req.query.courseID]
    // console.log("hi",ids)
    // const noteArr = await Note.find({'courseID': { $in: ids} })
    const quizArr = await Quiz.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo}).populate('Question')
                    .sort({ updateDate : 'descending'})
    //console.log(noteArr)
    
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
// req.query: courseID, chapterNo, topicNameArr
router.get('/quiz/:totalMark', async (req, res) => {
    try {
      // const ids = [req.query.courseID]
      // console.log("hi",ids)
      // const noteArr = await Note.find({'courseID': { $in: ids} })
      const quesArr = await Qustion.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo, 'topicName': req.query.topicName})
                      .sort({ updateDate : 'descending'})
      
      if (Object.keys(quesArr).length <= req.params.totalMark){
        res.status(200).json({
            quesArr : quesArr
        })
      }
      else{
        res.status(404).json({
            error: 'Select less questions',
            msg: err
          }) 
      }
        
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
  
  // try {
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
    
  // } catch (err) {
  //   res.json({
  //     error: 'error occured in saving question'
  //   })
  // }
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