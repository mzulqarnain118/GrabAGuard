const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    height: Joi.string().allow(''),
    weight: Joi.string().allow(''),
    companyName: Joi.string().allow(''),
    companyNumber: Joi.string().allow(''),
    position: Joi.string().allow(''),
    previousWork: Joi.string().allow(''),
    summary: Joi.string().allow(''),
    role: Joi.string().required().valid('hirer', 'guard', 'admin'),
    active: Joi.boolean(),
    about: Joi.string().allow(''),
    hourlyRate: Joi.string().allow(''),
    location: Joi.string().allow(''),
    longitude: Joi.string().allow(''),
    latitude: Joi.string().allow(''),
    fcmToken: Joi.string().allow(''),
    status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
    skill: Joi.string().valid('Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'),
    jobStatus: Joi.string().valid('Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected"),
  }),
};

const socialRegister = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required().custom(password),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    height: Joi.string().allow(''),
    weight: Joi.string().allow(''),
    companyName: Joi.string().allow(''),
    companyNumber: Joi.string().allow(''),
    position: Joi.string().allow(''),
    hourlyRate: Joi.string().allow(''),
    previousWork: Joi.string().allow(''),
    summary: Joi.string().allow(''),
    role: Joi.string().required().valid('hirer', 'guard', 'admin'),
    active: Joi.boolean(),
    accessToken: Joi.string().allow(''),
    refreshToken: Joi.string().allow(''),
    socialAuth: Joi.boolean(),
    expires: Joi.string().allow(''),
    about: Joi.string().allow(''),
    location: Joi.string().allow(''),
    longitude: Joi.string().allow(''),
    latitude: Joi.string().allow(''),
    fcmToken: Joi.string().allow(''),
    status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
    skill: Joi.string().valid('Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'),
    jobStatus: Joi.string().valid('Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected"),
  }),
};

const sendOtpToPhone = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const verify2FAToken = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    token2FA: Joi.string().required(),
  }),
};

const adminPanelLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const forgotPasswordWithPhone = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
  }),
};
const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendOtpToPhone,
  adminPanelLogin,
  socialRegister,
  forgotPasswordWithPhone,
  verify2FAToken
};
