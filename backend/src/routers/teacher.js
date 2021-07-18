const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = mongoose.model('User');
const router = express.Router();

// router.post("/course/add", async (req, res) => {
//   //console.log("In /course/add")
//   console.log(req.body)
//   try {
//     const course = new Course({
//       name: req.body.name,
//     });
//     await course.save();
//   } catch (error) {
//     res.status(400).json({
//       error: "internal error",
//     });
//   }
//   res.json({
//     success: true,
//   });
// });
// No req params needed
router.get("/teacher/all", async(req, res) => {
    try {
        // console.log("uff");
        // { userType: "Teacher" }
        const teachers = await User.find({ userType: "Teacher" });
        var pos = [];
        var teachers2 = [];
        // console.log(teachers.type);

        for (var i = 0; i < teachers.length; i++) {

            // console.log(teachers[i]);

            if (typeof teachers[i].userDetails[0].code === 'undefined') {


                // pos.push(i);
                // console.log(pos);
                teachers2.push(teachers[i]);


            }
        }

        // for (let j = 0; j < pos.length; j++) {
        //     teachers.splice(pos[j], 1);
        // }



        const teacherArr = teachers2.map((teacher) => {


            return {
                _id: teacher._id,
                objectId: teacher.userDetails[0]._id,
                name: teacher.fullname,
                email: teacher.email,
                mobileno: teacher.mobileno,
                education: teacher.userDetails[0].education,
                institute: teacher.userDetails[0].institute,
                department: teacher.userDetails[0].department,
                hscPassyear: teacher.userDetails[0].hscPassyear,
                subject1: teacher.userDetails[0].subject1,
                subject2: teacher.userDetails[0].subject2,
                subject3: teacher.userDetails[0].subject3


            };



        });



        // //console.log(postEdit)
        // console.log("after data push");
        // console.log(teacherArr);

        res.status(200).json({

            teachers: teacherArr,
        });
    } catch (err) {
        res.status(400).json({
            error: "something went wrong",
            msg: err,
        });
    }
});


router.post("/teacher/approve", async(req, res) => {
    console.log(req.body.objectId);
    console.log(req.body.code);
    //console.log(req.user)
    try {
        const user = await User.findOne({ _id: req.body._id });
        user.userDetails[0].code = req.body.code;
        await user.save();
        // console.log(user.userDetails);
        // await user.updateOne({

        //     'userDetails[0]._id': req.body.objectId,
        //     // _id: req.body.objectId,
        // }, {

        //     // $push: {
        //     //     'userDetails[0].code': req.body.code
        //     //         // 'userDetails[0]': {
        //     //         //     code: req.body.code
        //     //         // }
        //     //         // "userDetails[0].$.code": req.body.code

        //     //     // code: req.body.code

        //     // },
        //     $set: { 'userDetails[0].code': req.body.code }

        // }, {
        //     upsert: true
        // });
        res.json({
            success: true,
        });
    } catch (err) {
        res.json({
            error: "error occured" + err,
        });
    }
});


router.post("/teacher/reject", async(req, res) => {
    // console.log(req.body.objectId);
    // console.log(req.body.code);
    //console.log(req.user)
    try {
        const user = await User.deleteOne({ _id: req.body._id });
        // user.userDetails[0].code = req.body.code;
        // await user.save();

        res.json({
            success: true,
        });
    } catch (err) {
        res.json({
            error: "error occured" + err,
        });
    }
});

// router.post("/course/chapter/add", async (req, res) => {
//   console.log(req.body);
//   //console.log(req.user)
//   try {
//     await Course.updateOne(
//       {
//         _id: req.body._id,
//       },
//       {
//         $push: {
//           chapters: {
//             chapterName: req.body.chapterName,
//             chapterNo: req.body.chapterNo,
//           },
//         },
//       }
//     );
//     res.json({
//       success: true,
//     });
//   } catch (err) {
//     res.json({
//       error: "error occured",
//     });
//   }
// });
// http://localhost:5000/course/chapter/all?_id=60ad0cedb60e311790fef7c6
// req params: _id
// router.get("/course/chapter/all", async (req, res) => {
//   try {
//     // console.log("printing id");
//     // console.log(req.query._id);
//     const course = await Course.findById(req.query._id);
//     // console.log(course)
//     const chapterArr = course.chapters.map((chapter) => {
//       return {
//         chapterName: chapter.chapterName,
//         chapterNo: chapter.chapterNo,
//         //notes : chapter.notes
//       };
//     });
//     chapterArr.sort((a, b) => (a.chapterNo > b.chapterNo ? 1 : -1));
//     res.status(200).json({
//       chapterArr: chapterArr,
//     });
//   } catch (err) {
//     res.status(400).json({
//       error: "something went wrong",
//       msg: err,
//     });
//   }
// });

// http://localhost:5000/course/chapter?_id=60ad0cedb60e311790fef7c6&chapterNo=2
// req params: course id(_id), chapterNo(chapterNo)
// router.get("/course/chapter/", async (req, res) => {
//   try {
//     const course = await Course.findById(req.query._id);
//     // console.log(course)
//     const chapter = course.chapters.map((chapter) => {
//       if (chapter.chapterNo == req.query.chapterNo)
//         return {
//           chapterName: chapter.chapterName,
//           chapterNo: chapter.chapterNo,
//           //notes : chapter.notes
//         };
//     });
//     res.status(200).json({
//       chapter: chapter,
//     });
//   } catch (err) {
//     res.status(400).json({
//       error: "something went wrong",
//       msg: err,
//     });
//   }
// });

module.exports = router;