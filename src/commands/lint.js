const path = require('path')

const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const stylelintrcPath = path.resolve(__dirname, '..', '.stylelintrc')
const shellCommands = {
  css: `stylelint '${constants.css.inputGlob}' --config ${stylelintrcPath}`
}

const command = {
  command: 'lint',
  handler: async function () {
    log.info('Linting')
    await executeShellCommand(shellCommands.css).catch(errorHandler)
    log.success('Linted')
    return Promise.resolve()
  }
}

module.exports = {
  command
}
