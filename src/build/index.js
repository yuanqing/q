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
  command: 'build [types..]',
  describe: 'Build HTML, CSS, images',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', 'images'],
      default: ['html', 'css', 'images']
    })
  },
  handler: function ({ types }) {
    return execute(
      types.map(function (type) {
        return tasks[type]()
      }),
      { concurrent: false }
    )
  }
}
