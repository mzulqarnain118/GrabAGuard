const Joi = require('joi');

const createQuery = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

const getQueries = {
  query: Joi.object().keys({
    question: Joi.string(),
    answer: Joi.string(),
  }),
};


module.exports = {
  createQuery,
  getQueries,
};
