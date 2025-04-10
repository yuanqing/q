const css = require('./css')
const html = require('./html')
const images = require('./images')
const static = require('./static')
const execute = require('../execute')

const tasks = {
  css,
  html,
  images,
  static
}

module.exports = {
  command: 'build [types..]',
  describe: 'Build HTML, CSS, images, and static files',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', 'images', 'static'],
      default: ['html', 'css', 'images', 'static']
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
      }),
      { concurrent: false }
    )
  }
}
