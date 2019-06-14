const chokidar = require('chokidar')

const shellCommands = require('./build').shellCommands
const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const specification = {
  css: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: shellCommands.css
  },
  html: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: shellCommands.html
  },
  images: {
    glob: [constants.images.inputGlob],
    shellCommand: shellCommands.images,
    options: {
      quiet: true
    }
  }
}

function executeWatch ({ glob, shellCommand, options }) {
  async function build () {
    await executeShellCommand(shellCommand, options).catch(errorHandler)
  }
  const watcher = chokidar.watch(glob)
  watcher.on('ready', build)
  watcher.on('change', build)
}

const command = {
  command: 'watch [type]',
  builder: function (yargs) {
    yargs.positional('type', {
      type: 'string',
      choices: ['css', 'html', 'images']
    })
  },
  handler: async function ({ type }) {
    log.info('Watching…')
    if (typeof type === 'undefined') {
      executeWatch(specification.css)
      executeWatch(specification.html)
      executeWatch(specification.images)
    } else {
      executeWatch(specification[type])
    }
    return Promise.resolve()
  }
}

module.exports = {
  command
}
