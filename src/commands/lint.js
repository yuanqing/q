const path = require('path')

const constants = require('../constants')
const executeShellCommands = require('../execute/execute-shell-commands')

const stylelintrcPath = path.resolve(__dirname, '..', '.stylelintrc')
const shellCommands = {
  css: {
    title: 'css',
    command: `stylelint '${
      constants.css.inputGlob
    }' --config ${stylelintrcPath}`
  }
}

const command = {
  command: 'lint [types..]',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['css'],
      default: ['css']
    })
  },
  handler: async function ({ types }) {
    return executeShellCommands(
      types.map(function (type) {
        return shellCommands[type]
      })
    )
  }
}

module.exports = {
  command
}
