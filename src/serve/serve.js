const constants = require('../constants')

module.exports = function () {
  return {
    title: 'serve',
    task: `sirv start --dev --port ${constants.servePort} ${
      constants.outputDirectoryPath
    }`
  }
}
