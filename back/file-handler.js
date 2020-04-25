const fs = require('fs'),
  detect = require('detect-file-type');

function detectFileType(path) {
  return new Promise((resolve, reject) => {
    detect.fromFile(path, (err, result) => {
      if (err) return console.log(err);
      resolve(result);
    });
  });
}

function deleteFile(path) {
  fs.unlink(path, (err) => {
    if (!err) console.log('File deletion successful.');
  });
}

module.exports = {
  detectFileType,
  deleteFile,
};
