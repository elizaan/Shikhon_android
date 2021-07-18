const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

//const app = express();

// Middleware
// app.use(bodyParser.json());
// app.use(methodOverride('_method'));
//app.set('view engine', 'ejs');

// Mongo URI
// const mongoURI = 'mongodb://brad:brad@ds257838.mlab.com:57838/mongouploads';
const mongoURI = 'mongodb://shikhon:shikhon647189@cluster0-shard-00-00.myjhp.mongodb.net:27017,cluster0-shard-00-01.myjhp.mongodb.net:27017,cluster0-shard-00-02.myjhp.mongodb.net:27017/Demo?ssl=true&replicaSet=atlas-ry2upm-shard-0&authSource=admin&retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useUnifiedTopology: true });

// Init gfs
let gfs;
let gridFSBucket;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo,{ useUnifiedTopology: true });
  gfs.collection('uploads');
  // gfs = new mongoose.mongo.GridFSBucket(conn.db,{ bucketName: 'uploads2'});
  console.log("grid fs connected")
});

// Create storage engine
// console.log(process.env.CLOUD_DB);
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
router.get('/file/all/view', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
    //   res.render('index', { files: false });
        return res.status(404).json({
            err: 'No files exist'
        });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
        if (file.isImage == true) {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          }
      });
    //   res.render('index', { files: files });
    // return res.json(files);
    }
  });
});

// @route POST /upload
// @desc  Uploads file to DB
router.post('/file/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/file/all', (req, res) => {
  console.log("in GET /file/all")
  gfs.files.find().toArray((err, files) => {
    // console.log(files)
    // console.log(err)
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});



// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  console.log(req.params.filename)
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      console.log("streaming image", file._id)
      const readstream = gfs.createReadStream(file.filename);
      // const readstream = gridFSBucket.openDownloadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/file/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});


module.exports = router;


// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));