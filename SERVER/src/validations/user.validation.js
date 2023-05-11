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
    hirerType: Joi.string().valid('Company', 'Individual'),
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
      location: Joi.string(),
      longitude: Joi.string(),
      latitude: Joi.string(),
      fcmToken: Joi.string(),
      is2FAEnabled: Joi.boolean(),
      hourlyRate: Joi.array(),
      height: Joi.string().allow(''),
      weight: Joi.string().allow(''),
      summary: Joi.string().allow(''),
      previousWork: Joi.string().allow(''),
      userBlock: Joi.boolean(),
      skill: Joi.array().items().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // validate that each item is a valid ObjectId
    .unique() ,
      status: Joi.string().valid('Approved', 'Pending', 'Blocked'),
      jobStatus: Joi.string().valid('Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected", "Cancelled"),
      guardRating: Joi.number().valid(1, 2, 3, 4, 5),
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
