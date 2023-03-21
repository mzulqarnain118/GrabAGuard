
const express = require('express');
const { getFiles } = require('../../controllers/files.controller');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const { S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
const File = require('../../models/files.model');

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

const upload = multer({});
router.get('/:userId/:fileType', getFiles);
router.post('/', upload.single('file'), (req, res) => {
  try {
    const { userId, type } = req.body;
    const file = req.file;
    console.log("PAYLOAD", req.file, req.body)
    const key = `${userId}/${type}`;
    const params = { Bucket: S3_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype };
    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error -> ' + err });
      } else {
          console.log("ho gaye burray",data)
        const newFile = new File({
          userId,
          type: type,
          url: data.Location,
        });
        await newFile.save();
        res.status(201).json(newFile);
        }
    });
  }
  catch (err) {
    console.log("error", err)
  }

});

// router
//   .route('/')
//   .post(validateFile, upload);
module.exports = router;
