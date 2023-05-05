const express = require('express');
const { appDataController } = require('../../controllers');

const router = express.Router();

router.post('/', appDataController.create);

router.get('/', appDataController.findAll);

router.get('/:id', appDataController.findOne);

router.put('/:id', appDataController.update);

router.delete('/:id', appDataController.delete);


module.exports = router;
