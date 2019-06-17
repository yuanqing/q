const executeShellCommands = require('../execute/execute-shell-commands')

const shellCommands = {
  html: {
    title: 'html',
    command: `prettier --write 'src/**/*.html'`
  },
  css: {
    title: 'css',
    command: `prettier --write 'src/**/*.css'`
  }
}

const command = {
  command: 'fix [types..]',
  describe: 'Auto-format HTML and CSS',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', ],
      default: ['html', 'css', ]
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
