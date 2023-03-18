const { hiredGuardService } = require('../services');

exports.create = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.create(req.body);
    res.status(201).json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
