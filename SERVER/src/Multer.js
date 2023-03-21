
const multer = require('multer');
const path = require('path');

const fileSystem = require('./FileSystem');
fileSystem.createDirectorySync('./GAG-FILES');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./GAG-FILES");
    },
    filename: function (req, file, callback) {

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        callback(null, text + '-' + Date.now() + path.extname(file.originalname));

    }
});

module.exports = multer({ storage: storage });
