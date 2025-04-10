const build = require('../build/html')
const constants = require('../constants')
const watch = require('./watch')

const glob = [constants.html.inputGlob]

module.exports = function (ignoreGlob) {
  return {
    title: 'html',
    task: function () {
      return watch(glob, build(ignoreGlob).task)
    }
  }
}
