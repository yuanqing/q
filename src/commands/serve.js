const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const commands = [
  `http-server ${constants.outputDirectoryPath} --silent`,
  'open-cli http://0.0.0.0:8080'
]

const serve = {
  command: 'serve',
  handler: async function () {
    log.info('Serving…')
    return Promise.all(
      commands.map(function (command) {
        return executeShellCommand(command).catch(errorHandler)
      })
    )
  }
}

module.exports = {
  serve
}
