const path = require('path')

const constants = require('../constants')

const stylelintrcPath = path.resolve(__dirname, '.stylelintrc')

module.exports = function () {
  return {
    title: 'css',
    task: `stylelint '${constants.css.inputGlob}' --config ${stylelintrcPath}`
  }
}
