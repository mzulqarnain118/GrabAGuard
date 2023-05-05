const express = require('express');
const { addServicesController } = require('../../controllers');

const router = express.Router();

router.post('/', addServicesController.create);

router.get('/', addServicesController.findAll);

router.get('/:id', addServicesController.findOne);

router.put('/:id', addServicesController.update);

router.delete('/:id', addServicesController.delete);


module.exports = router;
