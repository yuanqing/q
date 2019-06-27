const build = require('../build/images')
const constants = require('../constants')
const watch = require('./watch')

const glob = [constants.images.inputGlob]

module.exports = function () {
  return {
    title: 'images',
    task: function () {
      return watch(glob, build().task)
    }
  }
}
