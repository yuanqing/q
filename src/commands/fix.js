const executeShellCommands = require('../execute/execute-shell-commands')

const shellCommands = {
  css: {
    title: 'css',
    command: `prettier --write 'src/**/*.css'`
  },
  html: {
    title: 'html',
    command: `prettier --write 'src/**/*.html'`
  }
}

const command = {
  command: 'fix [types..]',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['css', 'html'],
      default: ['css', 'html']
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
