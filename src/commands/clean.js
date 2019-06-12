const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const commands = [
  'rm -rf build',
  'find . -name .DS_Store -delete',
  'find . -name .vscode -delete',
  'find . -name *.js.map -delete',
  'find . -name *.log -delete'
]

const clean = {
  command: 'clean',
  handler: async function () {
    log.info('Cleaning…')
    await executeShellCommands(commands).catch(errorHandler)
    log.success('Cleaned')
    return Promise.resolve()
  }
}

module.exports = {
  clean
}
