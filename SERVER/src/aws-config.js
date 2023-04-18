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

//TODO: check if credentials are valid
// const credentials = new AWS.SharedIniFileCredentials({ profile: 'ap-southeast-1' });
// AWS.config.credentials = credentials;
// if (AWS.config.credentials) {
//   console.log('AWS SDK is properly configured with valid credentials.');
// } else {
//   console.log('AWS SDK is not properly configured with valid credentials.');
// }
//TODO: check if bucket exists
// S3.listBuckets((err, data) => {
//   if (err) {
//     console.log('Error:', err);
//   } else {
//     console.log('Success:', data.Buckets);
//   }
// });
//TODO: Generate a pre-signed URL for the uploaded file
// const signedUrlExpireSeconds = 60 * 5; // 5 minutes //!if you wanna add time limit to the url otherwise remove this line and expires from the params
// const url = S3.getSignedUrl('getObject', {
//   Bucket: bucketName,
//   Key: key,
   // Expires: signedUrlExpireSeconds
// });
// console.log('Pre-signed URL:', url);
