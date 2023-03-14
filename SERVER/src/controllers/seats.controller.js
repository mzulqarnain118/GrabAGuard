const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { seatsService } = require('../services');

const createSeat = catchAsync(async (req, res) => {
  const query = await seatsService.createSeat(req.body);
  res.status(httpStatus.CREATED).send(query);
});

const getSeats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await seatsService.querySeats(filter);
  res.send(result);
});



module.exports = {
  createSeat,
  getSeats,
};
