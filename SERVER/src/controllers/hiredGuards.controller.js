const { hiredGuardService } = require('../services');
const { HiredGuard,User } = require('../models');

exports.create = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.create(req.body);
    res.status(201).json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findByGuardId= async (req, res) => {
  try {
    const hiredGuard = await HiredGuard.find({ guard_id: req.params.guardId });
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Guard not found' });
    }
    return res.status(200).json(hiredGuard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};

exports.hirerBookings = async (req, res) => {
  try {
    const hiredGuard = await HiredGuard.find({ hirer_id: req.params.hirerId });
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Hirer not found' });
    }
    return res.status(200).json(hiredGuard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};
exports.findAll = async (req, res) => {
  try {
    const hiredGuards = await hiredGuardService.findAll();
    res.json(hiredGuards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.findOne(req.params.id);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Hired guard not found' });
    }
    res.json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.update(req.params.id, req.body);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Hired guard not found' });
    }
    res.json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.delete(req.params.id);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Hired guard not found' });
    }
    res.json({ message: 'Hired guard deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
