
const { AddServices } = require('../models');

exports.create = (data) => {
  const AddService = new AddServices(data);
  return AddService.save();
};

exports.findAll = () => AddServices.find();

exports.findOne = (id) => AddServices.findById(id);

exports.update = (id, data) => AddServices.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) => AddServices.findByIdAndDelete(id);

exports.findByGuardId = (id, skill) => AddServices.updateMany({ guard_id: id }, { skill: skill });
