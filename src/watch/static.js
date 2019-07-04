const build = require('../build/static')
const constants = require('../constants')
const watch = require('./watch')

const glob = [constants.static.inputGlob]

module.exports = function () {
  return {
    title: 'static',
    task: function () {
      return watch(glob, build().task)
    }
  }
}
