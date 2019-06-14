const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const shellCommands = {
  serve: `http-server ${constants.outputDirectoryPath} --silent`,
  open: 'open-cli http://0.0.0.0:8080'
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
    log.info('Serving…')
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
