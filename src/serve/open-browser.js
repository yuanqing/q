const constants = require('../constants')

module.exports = function () {
  return {
    title: 'open',
    task: `open-cli http://0.0.0.0:${constants.servePort}`
  }
}
