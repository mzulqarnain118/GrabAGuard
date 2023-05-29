const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const { SES } = require('../aws-config');
const otpGenerator = require('otp-generator');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, replyTo) => {
  const msg = { from: config.email.from, to, subject, text, replyTo };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};



const sendOtpEmailByAwsSES = async (to) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  await sendEmailWithSES(to, 'Email Verification OTP', otp);
  return otp;
};
/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

const sendEmailWithSES = async (to, subject, emailHTMLBody, replyTo, attachmentPath) => {
  // Define the email parameters
  const params = {
    Destination: {
      ToAddresses: to ? [to] : [config.email.support],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHTMLBody,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Body', //emailTextBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: config.email.from,
    ReplyToAddresses: [replyTo],
  };
  // Check if attachmentPath is provided
  // if (attachmentPath) {
  //   const attachmentData =attachmentPath.buffer; // Read the attachment file
  //   const contentType = attachmentPath.mimetype; // Determine the content type based on the file extension
  //   params.Message.Attachments = [
  //     // Add the attachment to the email parameters
  //     {
  //       Filename: attachmentPath.originalname,
  //       Content: attachmentData,
  //       ContentType: contentType,
  //     },
  //   ];
  // }
  try {
    const data = await SES.sendEmail(params).promise();
    console.log('EMAIL SENT SUCCESSFULLY', data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    return error;
  }
};

const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmailWithSES(to, subject, text);
};


module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailWithSES,
  sendOtpEmailByAwsSES,
};
