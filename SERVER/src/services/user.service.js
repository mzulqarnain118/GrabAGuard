const httpStatus = require('http-status');
const { User, HiredGuard } = require('../models');
const ApiError = require('../utils/ApiError');
const { findByGuardId } = require('./hiredGuards.service');
const initializeFirebaseAdmin = require('../firebaseAdmin');
initializeFirebaseAdmin();
const admin = require('firebase-admin');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  console.log(userBody, 'userBody');
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const isEmailAlreadyTaken = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return;
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
  const users = await User.find().populate('skill');
  return users;
};

const getRevenueByMonthYear = async () => {
  const revenue = await HiredGuard.aggregate([
    {
      $addFields: {
        month: { $dateToString: { format: '%m', date: '$from' } },
        year: { $dateToString: { format: '%Y', date: '$from' } },
      },
    },
    {
      $group: {
        _id: { month: '$month', year: '$year' },
        paymentSum: { $sum: { $toDouble: '$payment' } },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    {
      $group: {
        _id: '$_id.year',
        data: {
          $push: {
            name: '$_id.year',
            data: '$paymentSum',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        data: '$data.data',
      },
    },
  ]);

  return revenue;
};

const getSkillCounts = async () => {
  const skillData = await HiredGuard.aggregate([
    {
      $match: {
        skill: { $exists: true, $ne: '' },
      },
    },
    {
      $group: {
        _id: '$jobStatus',
        DoorSupervisors: {
          $sum: {
            $cond: {
              if: { $in: ['Door Supervisors', { $split: ['$skill', ','] }] },
              then: 1,
              else: 0,
            },
          },
        },
        KeyHoldingandAlarmResponse: {
          $sum: {
            $cond: {
              if: { $in: ['Key Holding and Alarm Response', { $split: ['$skill', ','] }] },
              then: 1,
              else: 0,
            },
          },
        },
        DogHandlingService: {
          $sum: {
            $cond: {
              if: { $in: ['Dog Handling Service', { $split: ['$skill', ','] }] },
              then: 1,
              else: 0,
            },
          },
        },
        CCTVMonitoring: {
          $sum: {
            $cond: {
              if: { $in: ['CCTV Monitoring', { $split: ['$skill', ','] }] },
              then: 1,
              else: 0,
            },
          },
        },
        VIPCloseProtection: {
          $sum: {
            $cond: {
              if: { $in: ['VIP Close Protection', { $split: ['$skill', ','] }] },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        jobStatus: '$_id',
        data: {
          $switch: {
            branches: [
              {
                case: { $eq: ['$_id', 'Completed'] },
                then: {
                  Completed: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
              {
                case: { $eq: ['$_id', 'Accepted'] },
                then: {
                  Accepted: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
              {
                case: { $eq: ['$_id', 'Rejected'] },
                then: {
                  Rejected: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
              {
                case: { $eq: ['$_id', 'Checked in'] },
                then: {
                  CheckIn: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
              {
                case: { $eq: ['$_id', 'Cancelled'] },
                then: {
                  Cancelled: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
              {
                case: { $eq: ['$_id', 'Checked out'] },
                then: {
                  CheckOut: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },

              {
                case: { $eq: ['$_id', 'Pending'] },
                then: {
                  Pending: [
                    '$DoorSupervisors',
                    '$KeyHoldingandAlarmResponse',
                    '$DogHandlingService',
                    '$CCTVMonitoring',
                    '$VIPCloseProtection',
                  ],
                },
              },
            ],
            default: { $literal: [] },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        skillData: { $push: { k: '$jobStatus', v: '$data' } },
      },
    },
    {
      $project: {
        _id: 0,
        skillData: {
          $arrayToObject: '$skillData',
        },
      },
    },
  ]);
console.log(skillData, 'skillData')
  return skillData;
};

const getDashboardData = async () => {
  const usersData = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        hirers: { $sum: { $cond: { if: { $eq: ['$_id', 'hirer'] }, then: '$count', else: 0 } } },
        guards: { $sum: { $cond: { if: { $eq: ['$_id', 'guard'] }, then: '$count', else: 0 } } },
      },
    },
  ]);

  const hirerGuardData = await HiredGuard.aggregate([
    {
      $match: { jobStatus: 'Completed' }, // Filter records based on jobStatus
    },
    {
      $group: {
        _id: null,
        jobs: { $sum: 1 },
        hours: {
          $sum: {
            $divide: [
              { $subtract: [{ $toDate: '$to' }, { $toDate: '$from' }] },
              1000 * 60 * 60, // Convert milliseconds to hours
            ],
          },
        },
      },
    },
  ]);

  const hirerGuardData1 = await HiredGuard.aggregate([
    {
      $match: { paymentStatus: true }, // Filter records based on jobStatus
    },
    {
      $group: {
        _id: null,
        cashflow: { $sum: { $toInt: '$totalPayment' } },
        revenue: { $sum: { $toInt: '$fee' } },
      },
    },
  ]);

  const dashboardData = {
    hirers: usersData[0].hirers,
    guards: usersData[0].guards,
    jobs: hirerGuardData[0].jobs,
    revenue: hirerGuardData1[0].revenue,
    hours: hirerGuardData[0].hours,
    cashflow: hirerGuardData1[0].cashflow,
  };
  console.log('🚀 ~ file: user.service.js:103 ~ getDashboardData ~ dashboardData:', dashboardData);
  return dashboardData;
};
const getActiveGuardUsers = async () => {
  const query = {
    role: 'guard',
    active: true,
  };
  const options = {};
  const result = await User.find(query, options);
  return result;
};
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

const getUserByPhone = async (phone) => {
  return User.findOne({ phone });
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
  // if (updateBody?.skill && user?.role==="guard") {
  //    const results= await findByGuardId(userId,updateBody.skill);
  // }
  if (updateBody?.status === 'Approved') {
    const message = {
      notification: {
        title: 'Grab A Guard',
        body: 'Congratulations! Your account has been approved.',
      },
      // Additional data payload if needed
      data: {
        key1: 'value1',
        key2: 'value2',
      },
      // Target device(s) or topic(s)
      token: user.fcmToken,
    };
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent notification:', response);
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
  }
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

const blockUser = async (userId, blockedUserId, blockedUserName) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  if (!user.blockedUsers.some((item) => item?.id === blockedUserId)) {
    user.blockedUsers.push({ id: blockedUserId, name: blockedUserName });

    console.log('🚀 ~ file: user.service.js:138 ~ blockUser ~ user.blockedUsers:', user.blockedUsers);

    await user.save();
  }
  return user;
};

const unblockUser = async (userId, blockedUserId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  user.blockedUsers = user.blockedUsers.filter((item) => item?.id != blockedUserId);
  console.log(user.blockedUsers, 'user.blockedUsers');
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
  unblockUser,
  getDashboardData,
  getRevenueByMonthYear,
  getUserByPhone,
  isEmailAlreadyTaken,
};
