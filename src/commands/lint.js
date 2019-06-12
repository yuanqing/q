const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const commands = {
  css: `stylelint 'src/**/*.css'`
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
