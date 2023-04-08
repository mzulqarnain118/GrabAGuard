const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getDashboardData = catchAsync(async (req, res) => {
  const result = await userService.getDashboardData();
  res.send(result);
});

const getUsers = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await userService.queryUsers(filter, options);
  const result = await userService.queryUsers();
  res.send(result);
});

const getActiveGuardUsers = catchAsync(async (req, res) => {
  const result = await userService.getActiveGuardUsers();
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});


const getSkillCounts = async (req, res, next) => {
  try {
    const skillCounts = await userService.getSkillCounts();
    res.json(skillCounts);
  } catch (err) {
    next(err);
  }
};

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const blockedUserId = req.body.blockedUserId;
  const blockedUserName = req.body.blockedUserName;
  try {
    const user = await userService.blockUser(userId, blockedUserId, blockedUserName);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const unblockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const blockedUserId = req.body.blockedUserId;

  try {
    const user = await userService.unblockUser(userId, blockedUserId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getActiveGuardUsers,
  getSkillCounts,
  blockUser,
  unblockUser,
  getDashboardData,
};
