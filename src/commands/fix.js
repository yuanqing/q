const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const commands = {
  css: "prettier --write 'src/**/*.css'",
  html: "prettier --write 'src/**/*.html'"
}

const fix = {
  command: 'fix [type]',
  builder: function (yargs) {
    yargs.positional('type', {
      type: 'string',
      choices: ['css', 'html']
    })
  },
  handler: async function ({ type }) {
    log.info('Fixing…')
    if (typeof type === 'undefined') {
      await executeShellCommands([commands.css, commands.html]).catch(
        errorHandler
      )
    } else {
      await executeShellCommands([commands[type]]).catch(errorHandler)
    }
    log.success('Fixed')
    return Promise.resolve()
  }
}

module.exports = {
  fix
}
