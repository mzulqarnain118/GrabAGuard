const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { SNS,SES } = require('../aws-config');
const { tokenTypes } = require('../config/tokens');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, } = process.env;
// const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN); // Replace accountSid and authToken with your Twilio credentials
const otpGenerator = require('otp-generator');
const AWS = require('aws-sdk');

const sendOtpToPhoneByTwilio = async (phone) => {
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  // await twilio.messages.create({
  //   body: `Your OTP is ${otp}`,
  //   from: TWILIO_PHONE_NUMBER,
  //   to: phone
  // });
  return otp;
};

const sendOtpToPhoneByAwsSNS = async (phone) => {
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const params = {
    Message: `Your OTP is ${otp}`,
    PhoneNumber: phone,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional' // You can change this to 'Promotional' if you're sending marketing messages
      }
    }
  };
  console.log('Sending OTP to phone', phone, 'with OTP', otp,"params",params)
  try {
    await SNS.publish(params).promise();
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

const sendEmailWithSES = async (email) => {
  // define the email parameters
  const params = {
    Destination: {
      ToAddresses: email
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: 'HTML_FORMAT_BODY'
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'PLAIN_TEXT_BODY'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'EMAIL_SUBJECT'
      }
    },
    Source: 'SENDER_EMAIL_ADDRESS',
  };

  // send the email
  SES.sendEmail(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
};

const verifyOtp = async (phone, otp) => {
  // You can implement your own logic here to verify the OTP
  // In this example, we're just checking if the OTP matches the expected value
  const expectedOtp = await getOtp(phone);
  return otp === expectedOtp;
};

const getOtp = async (phone) => {
  // You can implement your own logic here to retrieve the OTP from a database or cache
  // In this example, we're just returning a hard-coded value
  return '123456';
};
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const adminPanelLoginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (user.role!=="admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to login');
  }

  return user;
};

const loginUserWithFacebook = async (email, name, facebookId) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const user = await userService.createUser({ email, name, facebookId });
    return user;
  }
  return user;
};

const loginUserWithGoogle = async (email, name, googleId) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const user = await userService.createUser({ email, name, googleId });
    return user;
  }
  return user;
};

const loginUserWithApple = async (email, name, appleId) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const user = await userService.createUser({ email, name, appleId });
    return user;
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  sendOtpToPhoneByTwilio,
  sendOtpToPhoneByAwsSNS,
  adminPanelLoginUserWithEmailAndPassword,
  loginUserWithFacebook,
  loginUserWithGoogle,
  loginUserWithApple,
};
