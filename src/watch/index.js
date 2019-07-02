const css = require('./css')
const html = require('./html')
const images = require('./images')
const execute = require('../execute')

const tasks = {
  css,
  html,
  images
}

module.exports = {
  command: 'watch [types..]',
  describe: 'Watch and rebuild HTML, CSS and images on changes',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', 'images'],
      default: ['html', 'css', 'images']
    })
    yargs.option('ignore', {
      alias: ['i'],
      type: 'string',
      default: 'src/**/_*'
    })
  },
  handler: function ({ types, ignore }) {
    return execute(
      types.map(function (type) {
        return tasks[type](ignore)
      })
    )
  }
}
