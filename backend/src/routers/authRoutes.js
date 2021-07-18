const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const User = mongoose.model('User');
const auth = require("../middleware/auth");

const router = express.Router();
// router.get("/", (req, res) => {
//     res.status(200).sendFile("/signup.html", {
//         root: "."
//     });
// });

// router.get("/login", (req, res) => {
//     res.status(200).sendFile("/login.html", {
//         root: "."
//     });
// });

router.post("/signup", async(req, res) => {
    console.log("hi");
    const {
        fullname,
        name,
        userType,
        email,
        mobileno,
        password,
        userDetails
        //cv
        // code,
        // education,
        // passyear,
        // registration
    } = req.body
        //console.log(req.body);
    console.log(fullname, name, userType, email, password, mobileno, userDetails.institute);
    if (!fullname) {
        return res.status(422).send({ error: "Please enter your full name!" });
    }

    if (!name) {
        return res.status(422).send({ error: "Please enter a user name!" });
    }

    if (!email) {
        return res.status(422).send({ error: "Please enter a valid email address!" });
    }

    if (!mobileno || String(mobileno).length != 11) {
        return res.status(422).send({ error: "Please enter a valid mobile no." });
    }

    if (!password) {
        return res.status(422).send({ error: "Please set a password!" });
    }

    if (password.length < 7) {
        return res.status(422).send({ error: "Password should consist of at least 7 characters!" });
    }

    if (userType === "Teacher") {
        if (!userDetails.institute) {
            return res.status(422).send({ error: "Please enter your institute name!" });
        }

        if (!userDetails.department) {
            return res.status(422).send({ error: "Please enter your department name!" });
        }
        if (!userDetails.education) {
            return res.status(422).send({ error: "Please choose your current educational status!" });
        }
        if (!userDetails.hscPassyear) {
            return res.status(422).send({ error: "Please choose your hsc passing year!" });
        }
        if (!userDetails.subject1 || !userDetails.subject2 || !userDetails.subject3) {

            return res.status(422).send({ error: "Please choose a preferred subject!" });
        }
    }
    // Create a new user
    //pore lagbe : typeof userDetails === 'undefined' ? [] :
    try {
        const user = new User({
            fullname: fullname,
            name: name,
            userType: userType,
            email: email,
            mobileno: mobileno,
            password: password,
            userDetails: {

                code: userDetails.code,
                education: userDetails.education,
                institute: userDetails.institute,
                department: userDetails.department,
                hscPassyear: userDetails.hscPassyear,
                subject1: userDetails.subject1,
                subject2: userDetails.subject2,
                subject3: userDetails.subject3,
                cv: userDetails.cv

            }
            // code: code,
            // education: education,
            // passyear: passyear,
            // registration: registration
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
        console.log("bye");
        res.send({ token: token });
        // const token = await user.generateAuthToken();
        // res.status(201).send({
        //     user,
        //     token
        // });
        //res.end("done");
    } catch (error) {
        //console.log(error);
        return res.status(400).send(error.message);
    }
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin1234@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'shikhonadminxyz',
}


router.post("/login", async(req, res) => {
    //Login a registered user
    //console.log(req.headers.token)
    console.log("hi2");
    try {
        const {
            email,
            password,
            code,
            userType

        } = req.body;
        console.log("testing 1.");
        console.log(email, password, code);
        if (!email || !password) {
            return res.status(422).send({ error: "Login failed! Invalid email or password" });
        }


        // const user = await User.findByCredentials(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            if (email === ADMIN.email && password === ADMIN.password) {

                const token = jwt.sign({ userId: 0 }, process.env.JWT_KEY);
                console.log(token);
                res.send({ token: token });

            } else {
                console.log(email, password);
                return res.status(422).send({ error: "Login failed! Invalid email or password" });

            }

        }
        if (user && user.userType === "Teacher") {
            if (userType != user.userType) {
                return res.status(422).send({ error: "Invalid login!" });
            }
            console.log("teacher ");
            console.log(user.userDetails[0].code);
            // console.log(user.userDetails["department"]);
            if (typeof user.userDetails[0].code === 'undefined') {
                console.log("undefined");
                // console.log("teacher er ta disos");
                return res.status(422).send({ error: 'Login failed! Admin has not approved your application yet!' });

            }
            console.log("teacher 2 ");
            await user.comparePassword(password);
            // await user.compareCode(code);
            // !code.localeCompare(user.userDetails[0].code)
            if (code != user.userDetails[0].code) {
                console.log("code compare failed");
                return res.status(422).send({ error: 'Login failed! Code mismatched' });
            }
            // console.log("teacher er ta disos");
            console.log("testing 2.");
            console.log(email, password);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
            console.log(token);
            res.send({ token: token });
            console.log("bye");
            console.log(token);

        }
        if (user && user.userType === "Student") {
            if (userType != user.userType) {
                return res.status(422).send({ error: "Invalid login" })
            }
            await user.comparePassword(password);
            console.log("testing 2.");
            console.log(email, password);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
            res.send({ token: token });
            console.log("bye");
            console.log(token);
        }

    } catch (error) {
        res.status(422).send({ error: 'Login failed! Invalid email or password' });
    }
});
// router.get("/me", auth, async(req, res) => {
//     // View logged in user profile
//     res.json(req.user);
// });

router.get("/user/all", async(req, res) => {
    try {
        //const user = await User.findOne({ email });
        const user = await User.find({});
        if (!user) {
            console.log(email, password);
            return res.status(200).send({ error: "Login failed! Invalid email or password" });
        }
        res.status(200).json({
            users: user
        })
        console.log("success");
        //console.log(email, password);
    } catch (error) {
        res.status(422).send({ error: 'cannot get /all ' });
    }

})
router.get("/user/me", async(req, res) => {
        console.log("hello");
        try {
            console.log(req.body.email)
            const { email } = req.body
                //const user = await User.findOne({ email });
            const user = await User.findOne({ email });
            if (!user) {
                console.log(email, password);
                return res.status(200).send({ error: "Login failed! Invalid email or password" });
            }
            res.status(200).json({
                users: user
            })
            console.log("success");
            console.log(email);
        } catch (error) {
            res.status(422).send({ error: 'cannot get user/me ' });
        }

    })
    // express().use(function(req, res, next) {
    //     if (!req.headers.authorization) {
    //         return res.status(403).json({
    //             error: "No credentials sent!"
    //         });
    //     }
    //     next();
    // });

// router.get("/me", auth, async(req, res) => {
//     // View logged in user profile
//     res.json(req.user);
// });

// router.post("/users/me/logout", auth, async(req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token;
//         });
//         await req.user.save();
//         res.send();
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// router.post("/users/me/logoutall", auth, async(req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length);
//         await req.user.save();
//         res.send();
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = router;