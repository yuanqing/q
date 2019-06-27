const css = require('./css')
const html = require('./html')
const execute = require('../execute')

const tasks = {
  css,
  html
}

module.exports = {
  command: 'fix [types..]',
  describe: 'Auto-format HTML and CSS',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css'],
      default: ['html', 'css']
    })
  },
  handler: async function ({ types }) {
    return execute(
      types.map(function (type) {
        return tasks[type]()
      })
    )
  }
}
