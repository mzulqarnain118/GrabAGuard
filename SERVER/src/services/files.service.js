const File = require('../models/files.model');

exports.createFile = async (userId, fileType, fileUrl) => {
  const file = new File({
    userId,
    fileType,
    fileUrl
  });
  await file.save();
  return file;
};

exports.getFileById = async (fileId) => {
  return await File.findById(fileId);
};
