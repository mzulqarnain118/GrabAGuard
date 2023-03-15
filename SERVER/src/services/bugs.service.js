const httpStatus = require('http-status');
const { Bugs } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Bugs>}
 */
const createBug = async (userBody) => {
  return Bugs.create(userBody);
};


const queryBugs = async () => {
  const AllBugs = await Bugs.find();
  return AllBugs;
};

module.exports = {
  createBug,
  queryBugs
};
