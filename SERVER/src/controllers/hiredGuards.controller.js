const { hiredGuardService, userService } = require('../services');
const { HiredGuard } = require('../models');
const socketIo = require('socket.io');
const express = require('express');
const server = express().listen(3002);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('newHiredGuard', (data) => {
    console.log('newHiredGuard', data);
  });

  socket.on('updateHiredGuard', (data) => {
    console.log('updateHiredGuard', data);
  });
});

exports.create = async (req, res) => {
  try {
    const hiredGuard = await hiredGuardService.create(req.body);
    io.emit('newHiredGuard', hiredGuard);
    res.status(201).json(hiredGuard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};


exports.findByGuardId= async (req, res) => {
  try {
    const id= req.params.guardId;
    const hiredGuard = await HiredGuard.find({ guard_id: id });
    if (hiredGuard.length === 0) {
      return res.status(404).json({ message: 'Guard not found' });
    }
    const userData = await userService.getUserById(id);
    console.log('userData', userData, hiredGuard);
    return res.status(200).json({ orders:hiredGuard, guardData:userData});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "check the payload properly" });
  }
};

exports.hirerBookings = async (req, res) => {
  try {
    const id = req.params.hirerId;
    const hiredGuard = await HiredGuard.find({ hirer_id: id });
    if (hiredGuard.length === 0) {
      return res.status(404).json({ message: 'Hirer not found' });
    }
    const userData = await userService.getUserById(id);
    console.log('userData', userData, hiredGuard);
    return res.status(200).json({ orders: hiredGuard, HirerData: userData });  } catch (err) {
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
    if (req.body.jobStatus === 'Accepted') {
      io.emit('updateHiredGuard', hiredGuard); // Emit the updated hiredGuard object to all clients
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
