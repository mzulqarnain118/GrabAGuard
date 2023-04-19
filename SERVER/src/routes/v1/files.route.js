
const express = require('express');
const { getFiles, getUserFiles } = require('../../controllers/files.controller');
const router = express.Router();
const multer = require('multer');
const { S3_BUCKET_NAME} = process.env;
const File = require('../../models/files.model');
const User = require('../../models/user.model');
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
        console.log("RESPONSE UPLOAD", data)
        const newFile = new File({
          userId,
          type: type,
          url: data.Location,
        });
        await newFile.save();
        if (type === "profilePic") {
          User.findByIdAndUpdate(userId, { profilePic: data.Location }, { new: true }, (error, updatedDocument) => {
            if (error) {
              console.log(error);
            } else {
              console.log(updatedDocument, "profile pic updated in User Model");
            }
          });
        }
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
    const { userId } = req.body;
    const fileId= req.params.id;
    const type = req.body.type.replace(/ /g, "_")
    const file = req.file;
    const key = `${userId}/${type}`;
    const params = { Bucket: S3_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype };
    S3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error -> ' + err });
      } else {
    
        const newFile=await File.findByIdAndUpdate(fileId, { url: data.Location }, { new: true }, (error, updatedDocument) => {
            if (error) {
              console.log("🚀 ~ file: files.route.js:70 ~ newFile ~ error:", error)
            } else {
              console.log("🚀 ~ file: files.route.js:73 ~ newFile ~ updatedDocument:", updatedDocument)
            }
        });
        console.log("🚀 ~ file: files.route.js:75 ~ newFile ~ newFile:", newFile)
        res.status(200).json(newFile);
      }

    });
  }
  catch (err) {
    console.log("error", err)
  }
});
module.exports = router;
