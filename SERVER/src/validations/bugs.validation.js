const Joi = require('joi');

const createBug = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    description: Joi.string().required(),
    url: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const getBugs = {
  query: Joi.object().keys({
    email: Joi.string().email(),
    description: Joi.string(),
  }),
};


module.exports = {
  createBug,
  getBugs,
};
