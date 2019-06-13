const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const commands = [
  `http-server ${constants.outputDirectoryPath}`,
  'open-cli http://0.0.0.0:8080'
]

const serve = {
  command: 'serve',
  handler: async function () {
    log.info('Serving…')
    await executeShellCommands(commands).catch(errorHandler)
    return Promise.resolve()
  }
}

module.exports = {
  serve
}
