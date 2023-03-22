const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
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
    longitude: Joi.string().allow(''),
    latitude: Joi.string().allow(''),
    fcmToken: Joi.string().allow(''),
    status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      // password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      about: Joi.string(),
      dob: Joi.date(),
      active: Joi.boolean(),
      skill: Joi.string().valid('Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'),
      status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
