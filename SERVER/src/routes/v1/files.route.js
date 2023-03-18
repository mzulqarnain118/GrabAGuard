const express = require('express');
const fileController = require('../../controllers/files.controller');
const fileValidation = require('../../validations/files.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.get('/:id', fileController.getFile);

router
  .route('/')
  .post(validate(fileValidation.fileSchema), fileController.uploadFile);

module.exports = router;
