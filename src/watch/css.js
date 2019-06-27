const build = require('../build/css')
const constants = require('../constants')
const watch = require('./watch')

const glob = [
  constants.css.inputGlob,
  constants.html.outputGlob // Rebuild when HTML output files changed
]

module.exports = function () {
  return {
    title: 'css',
    task: function () {
      return watch(glob, build().task)
    }
  }
}
