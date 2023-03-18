const express = require('express');
const hiredGuardController = require('../../controllers/hiredGuards.controller');

const router = express.Router();

router.post('/', hiredGuardController.create);

router.get('/', hiredGuardController.findAll);

router.get('/:id', hiredGuardController.findOne);

router.put('/:id', hiredGuardController.update);

router.delete('/:id', hiredGuardController.delete);

module.exports = router;
