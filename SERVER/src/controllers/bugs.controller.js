const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bugsService,emailService } = require('../services');
const multer = require('multer');
const { S3_BUCKET_NAME } = process.env;
const { S3 } = require('../aws-config');
const createBug = async (req, res) => {
  try {
      
      const { userId, email } = req?.body;
      const description = req?.body?.description?.replace(/ /g, "_")
    const file = req?.file;//image file
    let bucketS3Url = "";
      // console.log("PAYLOAD", req?.file, req?.body)
    if (file) {
         const key = `${userId}/bugs/${description}`;
         const params = { Bucket: S3_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype };
         S3.upload(params, async (err, data) => {
           if (err) {
             res.status(500).json({ error: 'Error -> ' + err });
           } else {
             console.log('RESPONSE UPLOAD', data);
             bucketS3Url = data.Location;
           }
         });
    }
      const body = { userId, email, description, url: bucketS3Url };
      const query = await bugsService.createBug(body);
      const emailSent = await emailService.sendEmailWithSES(
        email,
        'Bug Report',
        '<h1>Thank you for reporting a bug!</h1><p>We will look into it as soon as possible.</p><p>Thank you for your patience.</p><p>- GrabAGuard Team</p>'
      ); //,file

      res.status(httpStatus.CREATED).send({ query, emailSent });
    }
    catch (err) {
      console.log("error", err)
    }
};

const getBugs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await bugsService.queryBugs(filter);
  res.send(result);
});

module.exports = {
  createBug,
  getBugs,

};
