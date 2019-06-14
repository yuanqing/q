const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const commands = {
  css: `prettier --write 'src/**/*.css'`,
  html: `prettier --write 'src/**/*.html'`
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
      await executeShellCommand(commands.css).catch(errorHandler)
      await executeShellCommand(commands.html).catch(errorHandler)
    } else {
      await executeShellCommand(commands[type]).catch(errorHandler)
    }
    log.success('Fixed')
    return Promise.resolve()
  }
}

module.exports = {
  fix
}
