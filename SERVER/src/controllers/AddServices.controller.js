const { addServicesService } = require('../services');

exports.create = async (req, res) => {
  try {
    const hiredGuard = await addServicesService.create(req.body);
    res.status(201).json(hiredGuard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};



exports.findAll = async (req, res) => {
  try {
    const hiredGuards = await addServicesService.findAll();
    res.json(hiredGuards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const hiredGuard = await addServicesService.findOne(req.params.id);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hiredGuard = await addServicesService.update(req.params.id, req.body);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(hiredGuard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const hiredGuard = await addServicesService.delete(req.params.id);
    if (!hiredGuard) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
