const constants = require('../constants')

module.exports = function () {
  return {
    title: 'images',
    task: `imagemin '${constants.images.inputGlob}' --out-dir ${
      constants.images.outputDirectoryPath
    }`
  }
}
