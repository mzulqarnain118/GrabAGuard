//FileSystem Used for creating directories and files
const fs = require('fs');

//This method creates a new directory in the given path
const createDirectorySync = (directory) => {

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
            recursive: true
        });
    }

}

//This method creates a new file
const writeFileSync = (filename, text) => {
    fs.writeFileSync(filename, text, { flag: 'a+' });
}

module.exports.createDirectorySync = createDirectorySync;
module.exports.writeFileSync = writeFileSync;
