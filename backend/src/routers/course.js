const express = require("express");
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const router = express.Router();

router.post("/course/add", async(req, res) => {
    //console.log("In /course/add")
    //console.log(req.body)
    try {
        const course = new Course({
            name: req.body.name,
        });
        await course.save();
    } catch (error) {
        res.status(400).json({
            error: "internal error",
        });
    }
    res.json({
        success: true,
    });
});
// No req params needed
router.get("/course/all", async(req, res) => {
    try {
        const courses = await Course.find();
        //console.log(courses)
        const courseArr = courses.map((course) => {
            return {
                _id: course._id,
                name: course.name,
                chapters: course.chapters,
                teacher: course.teacher,
            };
        });
        //console.log(postEdit)
        res.status(200).json({
            courses: courseArr,
        });
    } catch (err) {
        res.status(400).json({
            error: "something went wrong",
            msg: err,
        });
    }
});

router.post("/course/chapter/add", async(req, res) => {
    //console.log(req.body);
    //console.log(req.user)
    try {
        await Course.updateOne({
            _id: req.body._id,
        }, {
            $push: {
                chapters: {
                    chapterName: req.body.chapterName,
                    chapterNo: req.body.chapterNo,
                },
            },
        });
        res.json({
            success: true,
        });
    } catch (err) {
        res.json({
            error: "error occured",
        });
    }
});
// http://localhost:5000/course/chapter/all?_id=60ad0cedb60e311790fef7c6
// req params: _id
router.get("/course/chapter/all", async(req, res) => {
    try {
        // console.log("printing id");
        // console.log(req.query._id);
        const course = await Course.findById(req.query._id);
        // console.log(course)
        const chapterArr = course.chapters.map((chapter) => {
            return {
                chapterName: chapter.chapterName,
                chapterNo: chapter.chapterNo,
                //notes : chapter.notes
            };
        });
        chapterArr.sort((a, b) => (a.chapterNo > b.chapterNo ? 1 : -1));
        res.status(200).json({
            chapterArr: chapterArr,
        });
    } catch (err) {
        res.status(400).json({
            error: "something went wrong",
            msg: err,
        });
    }
});

// http://localhost:5000/course/chapter?_id=60ad0cedb60e311790fef7c6&chapterNo=2
// req params: course id(_id), chapterNo(chapterNo)
router.get("/course/chapter/", async(req, res) => {
    try {
        const course = await Course.findById(req.query._id);
        // console.log(course)
        const chapter = course.chapters.map((chapter) => {
            if (chapter.chapterNo == req.query.chapterNo)
                return {
                    chapterName: chapter.chapterName,
                    chapterNo: chapter.chapterNo,
                    //notes : chapter.notes
                };
        });
        res.status(200).json({
            chapter: chapter,
        });
    } catch (err) {
        res.status(400).json({
            error: "something went wrong",
            msg: err,
        });
    }
});

router.delete("/course/", async(req, res) => {
    try {
		await Course.deleteOne({ '_id': req.query._id })
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

router.delete("/course/chapter", async(req, res) => {
    try {
		await Course.updateOne({
            _id: req.query._id,
        }, {
            $pull: {
                chapters: {
                    chapterNo: req.query.chapterNo,
                },
            },
        });
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