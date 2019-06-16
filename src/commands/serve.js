const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const shellCommands = {
  serve: `sirv start --dev --port ${constants.servePort} ${constants.outputDirectoryPath}`,
  open: `open-cli http://0.0.0.0:${constants.servePort}`
}

const command = {
  command: 'serve',
  builder: function (yargs) {
    yargs.option('open', {
      alias: ['o'],
      type: 'boolean'
    })
  },
  handler: async function ({ open }) {
    log.info('Serving...')
    return Promise.all(
      [
        executeShellCommand(shellCommands.serve).catch(errorHandler),
        open && executeShellCommand(shellCommands.open).catch(errorHandler)
      ].filter(Boolean)
    )
  }
}

module.exports = {
  command
}
