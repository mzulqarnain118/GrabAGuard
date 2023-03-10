const httpStatus = require('http-status');
const { Queries } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Queries>}
 */
const createQuery = async (userBody) => {
  return Queries.create(userBody);
};


const queryQueries = async () => {
  const AllQueries = await Queries.find();
  return AllQueries;
};

// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @returns {Promise<Queries>}
//  */
// const getUserById = async (id) => {
//   return Queries.findById(id);
// };

// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<Queries>}
//  */
// const getUserByEmail = async (email) => {
//   return Queries.findOne({ email });
// };

// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<Queries>}
//  */
// const updateUserById = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Queries not found');
//   }
//   if (updateBody.email && (await Queries.isEmailTaken(updateBody.email, userId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };

// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<Queries>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Queries not found');
//   }
//   await user.remove();
//   return user;
// };

module.exports = {
  createQuery,
  queryQueries,
  // getUserById,
  // getUserByEmail,
  // updateUserById,
  // deleteUserById,
};
