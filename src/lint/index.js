const css = require('./css')
const execute = require('../execute')

const tasks = {
  css
}

module.exports = {
  command: 'lint [types..]',
  describe: 'Lint CSS',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['css'],
      default: ['css']
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
