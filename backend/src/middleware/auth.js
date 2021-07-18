const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model('User');

const auth = async(req, res, next) => {
    const { authorization } = req.headers;
    console.log("In auth")
    if (!authorization) {
        console.log("ekhane??");
        return res.status(401).send({ error: "Not authorized to access this resource" });
    }
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
        if (err) {
            console.log("naki ekhane");
            return res.status(401).send({ error: "Not authorized to access this resource" });
        }

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
    //console.log('token', token)

    // try {
    //     const data = jwt.verify(token, process.env.jwtkey);
    //     //console.log(data)
    //     const user = await User.findOne({
    //         _id: data._id
    //     });

    //     if (!user) {
    //         throw new Error();
    //     }

    //     req.user = user;
    //     req.token = token;
    //     next();
    // } catch (error) {
    //     res.status(401).send({
    //         error: "Not authorized to access this resource"
    //     });
    // }
};

module.exports = auth;