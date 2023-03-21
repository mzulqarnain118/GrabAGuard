const File = require('../models/files.model');

async function getFiles(req, res, next) {
  try {
    const { userId, fileType } = req.params;
    const files = await File.find({ userId, type: fileType });
    res.json(files);
  } catch (err) {
    next(err);
  }
}
module.exports = {  getFiles };
