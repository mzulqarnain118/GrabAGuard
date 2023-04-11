const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

const S3 = new AWS.S3();
const SNS = new AWS.SNS();
const SES= new AWS.SES();

module.exports = {
  AWS,
  S3,
  SNS,
  SES
};
