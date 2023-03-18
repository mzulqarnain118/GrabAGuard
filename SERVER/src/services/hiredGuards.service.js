const { HiredGuard } = require('../models');

exports.create = (data) => {
  const hiredGuard = new HiredGuard(data);
  return hiredGuard.save();
};

exports.findAll = () => HiredGuard.find();

exports.findOne = (id) => HiredGuard.findById(id);

exports.update = (id, data) => HiredGuard.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) => HiredGuard.findByIdAndDelete(id);
