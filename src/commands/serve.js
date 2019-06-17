const constants = require('../constants')
const executeShellCommands = require('../execute/execute-shell-commands')

const shellCommands = [
  {
    title: 'open',
    command: `open-cli http://0.0.0.0:${constants.servePort}`
  },
  {
    title: 'serve',
    command: `sirv start --dev --port ${constants.servePort} ${
      constants.outputDirectoryPath
    }`
  }
]

const command = {
  command: 'serve',
  describe: 'Serve the `build` directory',
  builder: function (yargs) {
    yargs.option('open', {
      alias: ['o'],
      type: 'boolean'
    })
  },
  handler: async function ({ open }) {
    if (open) {
      return executeShellCommands(shellCommands)
    }
    return executeShellCommands([shellCommands[0]])
  }
}

module.exports = {
  command
}
