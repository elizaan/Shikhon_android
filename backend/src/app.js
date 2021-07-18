const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const app = express();
const server = require("http").createServer(app);
const io = socketio(server);
require("./models/User");
app.use(bodyParser.json());
app.use(methodOverride('_method'));
const auth = require('./middleware/auth');
dotenv.config();

const userRoute = require("./routers/authRoutes");
const courseRoute = require("./routers/course");
const teacherRoute = require("./routers/teacher");
const noteRoute = require("./routers/note");
const fileRoute = require("./routers/file");
const postRoute = require('./routers/post');
const QuestionRoute = require('./routers/question');
const QuizRoute = require('./routers/quiz');

app.use(userRoute);
app.use(courseRoute);
app.use(teacherRoute);
app.use(noteRoute);
app.use(fileRoute);
app.use(QuestionRoute)
app.use(QuizRoute)

require("./db/db.js");

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);

// app.get("/api/chat", (req, res) => {
//     res.json({
//         id: 12345
//     });
// });
app.get('/', auth, (req, res) => {
    res.status(200).send("welcome, " + req.user.name + "! Sign up successfull!");
})
io.on("connection", (socket) => {
    console.log("a new user connected");

    socket.on("join", ({
        name
    }) => {
        console.log(name);
        socket.join("1234");
    });

    socket.on("message", (message, callback) => {
        console.log(message);
        socket.to("1234").emit("sendMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("server started at port " + port);
});