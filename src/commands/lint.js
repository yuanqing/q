const path = require('path')

const constants = require('../constants')
const executeTasks = require('../execute-tasks')

const stylelintrcPath = path.resolve(__dirname, '..', '.stylelintrc')
const shellCommands = {
  css: {
    title: 'css',
    task: `stylelint '${
      constants.css.inputGlob
    }' --config ${stylelintrcPath}`
  }
}

const command = {
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
    return executeTasks(
      types.map(function (type) {
        return shellCommands[type]
      })
    )
  }
}

module.exports = {
  command
}
