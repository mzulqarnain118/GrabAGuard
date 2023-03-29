const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  console.log(userBody,"userBody")
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.find();
  return users;
};

const getSkillCounts = async () => {
  const skills = ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'];

  const completedJobs = await User.countDocuments({ jobStatus: "Completed" });
  const pendingJobs = await User.countDocuments({ jobStatus: "Pending" });

  const skillCountCompleted = {};
  const skillCountPending = {};

  for (const skill of skills) {
    const countCompleted = await User.countDocuments({ skill, jobStatus: "Completed" });
    skillCountCompleted[skill] = countCompleted;

    const countPending = await User.countDocuments({ skill, jobStatus: "Pending" });
    skillCountPending[skill] = countPending;
  }

  const result = [
    { 'Completed': [] },
    { 'Pending': [] }
  ];

  for (const skill of skills) {
    const countCompleted = skillCountCompleted[skill];
    result[0]['Completed'].push({ [skill]: countCompleted });

    const countPending = skillCountPending[skill];
    result[1]['Pending'].push({ [skill]: countPending });
  }

  return result;

};

const getActiveGuardUsers = async () => {
    const query = {
      role: "guard",
      active: true
    };
    const options = {};
    const result = await User.find(query, options);
    return result;
}
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const blockUser = async (userId, blockedUserId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  if (!user.blockedUsers.includes(blockedUserId)) {
    user.blockedUsers.push(blockedUserId);
    await user.save();
  }
  return user;
};

const unblockUser = async (userId, blockedUserId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  user.blockedUsers = user.blockedUsers.filter(id => id != blockedUserId);
  console.log(user.blockedUsers, "user.blockedUsers")
  await user.save();
  return user;
};
module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getActiveGuardUsers,
  getSkillCounts,
  blockUser,
  unblockUser
};
