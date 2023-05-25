const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    updateFirstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    updateLastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    updateEmail: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'admin',
    },
    address1: {
      type: String,
      required: true,
      trim: true,
    },
    address2: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postCode: {
      type: String,
      required: true,
      trim: true,
    },
    updateAddress: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    updatePhone: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
      trim: true,
    },
    height: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    companyNumber: {
      type: String,
      trim: true,
    },
    updateCompanyNumber: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    updatePosition: {
      type: String,
      trim: true,
    },
    previousWork: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    longitude: {
      type: String,
      trim: true,
    },
    latitude: {
      type: String,
      trim: true,
    },
    fcmToken: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Approved', 'Pending', 'Blocked'],
      default: 'Pending',
    },
    userBlock: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    skill: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddServices' }],
    jobStatus: {
      type: String,
      enum: ['Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', 'Rejected', 'Cancelled'],
    },
    hirerType: {
      type: String,
      enum: ['Individual', 'Company'],
    },
    profilePic: {
      type: String,
      trim: true,
      default: '',
    },
    socialAuth: {
      type: Boolean,
      default: false,
    },
    hourlyRate: [],
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    blockedUsers: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
