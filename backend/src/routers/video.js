const express = require('express')
const auth = require('../middleware/auth')
const Video = require('../models/Video')
const router = express.Router()


// req.body: courseID(_id),chapterNo, author, content, topicName
router.post('/video/add', async (req, res) => {

  try {
    const video = new Video({
      topicName: req.body.topicName,
      courseID: req.body.courseID,
      chapterNo: req.body.chapterNo,
      author: req.body.author? req.body.author: "Unknown",
      content: req.body.content
    })
    await video.save();
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
// http://localhost:5000/video/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
// req.body: courseID, chapterNo
router.get('/video/all', async (req, res) => {
  try {
    
    const videoArr = await Video.find({'courseID': req.query.courseID , 'chapterNo': req.query.chapterNo})
                    .sort({ updateDate : 'descending'})
    
    res.status(200).json({
        videoArr : videoArr
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});

// http://localhost:5000/video?_id=60b01137d76821469c27fcc8
// req.body: _id
router.get('/video', async (req, res) => {
  try {
    const video = await Video.findById(req.query._id)
    res.status(200).json({
      video : video
    })
  } catch (err) {
    res.status(400).json({
      error: 'something went wrong',
      msg: err
    })
  }
});

// param: _id, body: content,topicName
router.patch("/video", async (req, res) => {
	try {
		const video = await Video.findOne({ _id: req.query._id })
    
    if (req.body.content) video.content = req.body.content
	if (req.body.topicName) video.topicName = req.body.topicName
		 
    await video.save()
    
	res.status(200).json({
        video : video
    })
	} catch (err) {
        res.status(400).json({
          error: 'something went wrong',
          msg: err
        })
      }
})

router.delete('/video',async (req, res)=>{

  try {
		await Video.deleteOne({ '_id': req.query._id })
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