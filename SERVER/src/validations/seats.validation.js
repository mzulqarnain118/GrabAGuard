const Joi = require('joi');

const createSeat = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    available: Joi.boolean().required(),
    seat: Joi.number().required(),
    row: Joi.number().required(),

  }),
};

const getSeats = {
  query: Joi.object().keys({
    name: Joi.string(),
    phone: Joi.string(),
    available: Joi.boolean(),
    seat: Joi.number(),
    row: Joi.number(),
  }),
};


module.exports = {
  createSeat,
  getSeats,
};
