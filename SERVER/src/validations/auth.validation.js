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
    location: Joi.string().allow(''),
    status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
  }),
};

const login = {
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
};
