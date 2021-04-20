const ffmpeg = require(`fluent-ffmpeg`);
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const multer = require('multer');
const AWS = require('aws-sdk');
const s3Info = require('../private');
const model = require('../model');


//defining keys for S3 bucket
var ID = s3Info.s3Info.ID
var SECRET = s3Info.s3Info.SECRET
var BUCKET_NAME = s3Info.s3Info.BUCKET_NAME

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (filePath, fileName, cb) => {
  const fileContent = fs.readFileSync(filePath)
  const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent
  };

  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      cb(null, data.Location)
  });
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({dest:'uploads/'});

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/vidUpload', (req, res) => {
  model.publicLinks.get((results)=>{
    let jsonString = JSON.stringify(results)
    res.send(jsonString)
  });
})

app.post('/vidUpload', upload.single('file'), (req, res) => {
  let fileNameNoExtension = req.file.originalname.split('.')[0]
  fs.rename(`${__dirname}/uploads/${req.file.filename}`, `${__dirname}/uploads/${req.file.originalname}`, () =>{

    ffmpeg(`${__dirname}/uploads/${req.file.originalname}`)
      .size('50%')
      .addOption('-vf', 'scale=320x240')
      .format('gif')
      .save(`${__dirname}/uploads/${fileNameNoExtension}.gif`)
      .on('end', function() {
        uploadFile(`${__dirname}/uploads/${fileNameNoExtension}.gif`, `${fileNameNoExtension}.gif`, (err, bucketLink)=>{
          model.publicLinks.post(bucketLink, ()=>{
            model.publicLinks.get((results)=>{
              let jsonString = JSON.stringify(results)
              res.send(jsonString)
            });
          })
        })
      })
  })
})

app.listen(port, () => {
  console.log(`Gif Maker app listening at http://localhost:${port}`)
})