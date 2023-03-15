const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bugsService } = require('../services');

const createBug = catchAsync(async (req, res) => {
  const query = await bugsService.createBug(req.body);
  res.status(httpStatus.CREATED).send(query);
});

const getBugs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await bugsService.queryBugs(filter);
  res.send(result);
});

module.exports = {
  createBug,
  getBugs,

};
