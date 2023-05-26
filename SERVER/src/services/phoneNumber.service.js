const { SNS } = require('../aws-config');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, } = process.env;
// const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN); // Replace accountSid and authToken with your Twilio credentials
const otpGenerator = require('otp-generator');

const sendOtpToPhoneByTwilio = async (phone) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
    // await twilio.messages.create({
  //   body: `Your OTP is ${otp}`,
  //   from: TWILIO_PHONE_NUMBER,
  //   to: phone
  // });
  return otp;
};


const sendOtpToPhoneByAwsSNS = async (phone) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
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
  console.log('Sending OTP to phone', phone, 'with OTP', otp, "params", params)
  try {
    await SNS.publish(params).promise();
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

const sendResetPasswordPhoneNumber = async (phone, ResetPasswordScreenLink) => {
  const params = {
    Message: `Click to Reset your Password  ${ResetPasswordScreenLink}`,
    PhoneNumber: phone,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional' // You can change this to 'Promotional' if you're sending marketing messages
      }
    }
  };
  try {
    await SNS.publish(params).promise();
    return ResetPasswordScreenLink;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  sendOtpToPhoneByTwilio,
  sendOtpToPhoneByAwsSNS,
  sendResetPasswordPhoneNumber,
};