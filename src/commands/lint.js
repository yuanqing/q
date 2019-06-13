const path = require('path')

const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const stylelintrcPath = path.resolve(__dirname, '..', '.stylelintrc')
const commands = {
  css: `stylelint '${constants.css.inputGlob}' --config ${stylelintrcPath}`
}

const lint = {
  command: 'lint',
  handler: async function () {
    log.info('Linting')
    await executeShellCommands([commands.css]).catch(errorHandler)
    log.success('Linted')
    return Promise.resolve()
  }
}

module.exports = {
  lint
}
