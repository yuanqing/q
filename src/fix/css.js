const constants = require('../constants')

module.exports = function () {
  return {
    title: 'css',
    task: `prettier --write '${constants.css.inputGlob}'`
  }
}
