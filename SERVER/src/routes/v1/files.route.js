
const express = require('express');
const { getFiles, getUserFiles } = require('../../controllers/files.controller');
const router = express.Router();
const multer = require('multer');
const { S3_BUCKET_NAME} = process.env;
const File = require('../../models/files.model');
const { S3 } = require('../../aws-config');
const upload = multer({});
router.get('/:userId/:fileType', getFiles);
router.get('/:userId', getUserFiles);

router.post('/', upload.single('file'), (req, res) => {
  try {
    const { userId } = req.body;
    const type = req.body.type.replace(/ /g, "_")
    const file = req.file;
    console.log("PAYLOAD", req.file, req.body)
    const key = `${userId}/${type}`;
    const params = { Bucket: S3_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype };
    S3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error -> ' + err });
      } else {
          console.log("RESPONSE UPLOAD",data)
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

router.patch('/:id', upload.single('file'), async(req, res) => {
  try {
    console.log("PAYLOAD", req.params.id, req.params)
    const file = await File.findById(req.params.id);
    if (!file) {
      throw new Error('File not found');
    }
    console.log("PAYLOAD", file)

    const { userId, type } = file;
    const key = `${userId}/${type}`;
    const params = { Bucket: S3_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype, ACL: 'public-read' };
    S3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error -> ' + err });
      } else {
        console.log("RESPONSE UPLOAD", data)
        Object.assign(File, {
          url: data.Location,
        });
        await file.save();
        res.status(200).json(file);      }
    });
  }
  catch (err) {
    console.log("error", err)
  }

});
module.exports = router;
