const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const commands = {
  serve: `http-server ${constants.outputDirectoryPath} --silent`,
  open: 'open-cli http://0.0.0.0:8080'
}

const serve = {
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
        executeShellCommand(commands.serve).catch(errorHandler),
        open && executeShellCommand(commands.open).catch(errorHandler)
      ].filter(Boolean)
    )
  }
}

module.exports = {
  serve
}
