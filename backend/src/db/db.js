const mongoose = require("mongoose");
const Grid = require('gridfs-stream');

mongoose.connect(process.env.CLOUD_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    poolSize: 10

}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('mongodb connected')
            // var conn = mongoose.connection;
            // conn.on('error', console.error.bind(console, 'connection error:'));
            // conn.once('open', () => {
            //     // Init stream
            //     gfs = Grid(conn.db, mongoose.mongo);
            //     gfs.collection('uploads');
            //     console.log("gridfs stream initialized")
            // })
            // gfs = Grid(conn.db, mongoose.mongo);
            // gfs.collection('uploads');

    }
});