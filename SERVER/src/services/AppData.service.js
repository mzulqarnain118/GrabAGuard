
const { AppData } = require('../models');

exports.create = (data) => {
  const newData = new AppData(data);
  return newData.save();
};

exports.findAll = () => AppData.find();

exports.findOne = (id) => AppData.findById(id);

exports.update = (id, data) => AppData.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) => AppData.findByIdAndDelete(id);

exports.findByGuardId = (id, skill) => AppData.updateMany({ guard_id: id }, { skill: skill });
