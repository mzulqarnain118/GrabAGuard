const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Joi = require('joi');
const File = require('../models/files.model');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure Multer to upload files to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
});

// Define controller methods
exports.uploadFile = upload.single('file'), async (req, res) => {
  const { error } = validateFile(req.file);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const file = new File({
    userId: req.body.userId,
    fileType: req.body.fileType,
    fileUrl: req.file.location
  });

  try {
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.status(200).json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define Joi validation schema
function validateFile(file) {
  const schema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    size: Joi.number().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    buffer: Joi.binary().required()
  });
  return schema.validate(file);
}
