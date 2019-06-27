const constants = require('../constants')
const executeTasks = require('../execute-tasks')

const shellCommands = [
  {
    title: 'open',
    task: `open-cli http://0.0.0.0:${constants.servePort}`
  },
  {
    title: 'serve',
    task: `sirv start --dev --port ${constants.servePort} ${
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
      return executeTasks(shellCommands)
    }
    return executeTasks([shellCommands[1]])
  }
}

module.exports = {
  command
}
