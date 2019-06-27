const constants = require('../constants')

module.exports = function () {
  return {
    title: 'html',
    task: `prettier --write '${constants.html.inputGlob}'`
  }
}
