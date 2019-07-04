const fs = require('fs-extra')

const constants = require('../constants')

module.exports = function () {
  return {
    title: 'static',
    task: function () {
      return fs.copy(constants.staticDirectoryPath, constants.outputDirectoryPath)
    }
  }
}
