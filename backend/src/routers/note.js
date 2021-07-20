const express = require('express')
const auth = require('../middleware/auth')
const Note = require('../models/Note')
const router = express.Router()


// req.body: courseID(_id),chapterNo, author, content, topicName
router.post('/note/add', async (req, res) => {
  // console.log(req.body)
  //console.log(req.user)
  try {
    const note = new Note({
      topicName: req.body.topicName,
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo,
      author: req.body.author,
      content: req.body.content
    })
    await note.save();
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
// http://localhost:5000/note/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
// req.body: courseID, chapterNo
router.get('/note/all', async (req, res) => {
  try {
    // const ids = [req.query.courseID]
    // console.log("hi",req.query.courseID, req.query.chapterNo);

    // const noteArr = await Note.find({'courseID': { $in: ids} })
    const noteArr = await Note.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo})
                    .sort({ updateDate : 'descending'})
    // console.log(noteArr)
    
    res.status(200).json({
      noteArr : noteArr
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});

// http://localhost:5000/note?_id=60b01137d76821469c27fcc8
// req.body: _id
router.get('/note', async (req, res) => {
  console.log(req.body)
  try {
    const note = await Note.findById(req.query._id)
    res.status(200).json({
      note : note
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});
// param: _id, body: content,topicName
router.patch("/note", async (req, res) => {
	try {
		const note = await Note.findOne({ _id: req.query._id })
    
    if (req.body.content)note.content = req.body.content
		if (req.body.topicName) note.topicName = req.body.topicName
		 
    await note.save()
    
		res.status(200).json({
      note : note
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})

router.delete('/note',async (req, res)=>{
  // console.log("here in note delete");
  // console.log(req.query._id);
  try {
		await Note.deleteOne({ '_id': req.query._id })
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

// param: _id, body: content,topicName
router.patch("/note", async (req, res) => {
  console.log(req.body.topicName);
  console.log(req.body.content);
	try {
		const note = await Note.findOne({ _id: req.query._id })
    
    if (req.body.content)note.content = req.body.content
		if (req.body.topicName) note.topicName = req.body.topicName
		 
    await note.save()
    
		res.status(200).json({
      note : note
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})

module.exports = router;