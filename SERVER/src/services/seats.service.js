const httpStatus = require('http-status');
const { Seats } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a seat
 * @param {Object} userBody
 * @returns {Promise<Seats>}
 */
const createSeat = async (userBody) => {
  return Seats.create(userBody);
};


const querySeats = async () => {
  const AllSeats = await Seats.find();
  return AllSeats;
};


module.exports = {
  createSeat,
  querySeats,
};
