const Joi = require('joi');

const createBug = {
  body: Joi.object().keys({
    description: Joi.string().required(),
  }),
};

const getBugs = {
  query: Joi.object().keys({
    description: Joi.string(),
  }),
};


module.exports = {
  createBug,
  getBugs,
};
