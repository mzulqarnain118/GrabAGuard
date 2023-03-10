const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { queriesService } = require('../services');

const createQuery = catchAsync(async (req, res) => {
  const query = await queriesService.createQuery(req.body);
  res.status(httpStatus.CREATED).send(query);
});

const getQueries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await queriesService.queryQueries(filter);
  res.send(result);
});

// const getUser = catchAsync(async (req, res) => {
//   const user = await queriesService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await queriesService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//   await queriesService.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createQuery,
  getQueries,
  // getUser,
  // updateUser,
  // deleteUser,
};
