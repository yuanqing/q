const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const commands = [
  `rm -rf ${constants.buildDirectoryPath}`,
  `find . -name .DS_Store -delete`,
  `find . -name .vscode -delete`,
  `find . -name *.js.map -delete`,
  `find . -name *.log -delete`
]

const clean = {
  command: 'clean',
  handler: async function () {
    log.info('Cleaning…')
    await Promise.all(
      commands.map(function (command) {
        return executeShellCommand(command).catch(errorHandler)
      })
    )
    log.success('Cleaned')
    return Promise.resolve()
  }
}

module.exports = {
  clean
}
