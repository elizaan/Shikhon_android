const express = require('express')
const auth = require('../middleware/auth')
const Pdf = require('../models/Pdf')
const router = express.Router()


// req.body: courseID(_id),chapterNo, author, content, topicName
router.post('/pdf/add', async(req, res) => {


        try {
            console.log(req.body);
            const pdf = new Pdf({
                topicName: req.body.topicName,
                courseID: req.body.courseID,
                chapterNo: req.body.chapterNo,
                author: req.body.author ? req.body.author : "Unknown",
                content: req.body.content
            })
            console.log(req.body);
            await pdf.save();

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
    // http://localhost:5000/pdf/all?courseID=60ad0cedb60e311790fef7c6&chapterNo=2
    // req.body: courseID, chapterNo
router.get('/pdf/all', async(req, res) => {
    try {

        const pdfArr = await Pdf.find({ 'courseID': req.query.courseID, 'chapterNo': req.query.chapterNo })
            .sort({ updateDate: 'descending' })

        res.status(200).json({
            pdfArr: pdfArr
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
});

// http://localhost:5000/pdf?_id=60b01137d76821469c27fcc8
// req.body: _id
router.get('/pdf', async(req, res) => {
    try {
        const pdf = await Pdf.findById(req.query._id)
        res.status(200).json({
            pdf: pdf
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
});

// param: _id, body: content,topicName
router.patch("/pdf", async(req, res) => {
    try {
        const pdf = await Pdf.findOne({ _id: req.query._id })

        if (req.body.content) pdf.content = req.body.content
        if (req.body.topicName) pdf.topicName = req.body.topicName

        await pdf.save()

        res.status(200).json({
            pdf: pdf
        })
    } catch (err) {
        res.status(400).json({
            error: 'something went wrong',
            msg: err
        })
    }
})

router.delete('/pdf', async(req, res) => {

    try {
        await Pdf.deleteOne({ '_id': req.query._id })
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