const chokidar = require('chokidar')

const buildCommands = require('./build').commands
const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const specification = {
  css: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    command: buildCommands.css
  },
  html: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    command: buildCommands.html
  },
  images: {
    glob: [constants.images.inputGlob],
    command: buildCommands.images,
    options: {
      quiet: true
    }
  }
}

function executeWatch ({glob, command, options}) {
  async function build () {
    await executeShellCommand(command, options).catch(errorHandler)
  }
  const watcher = chokidar.watch(glob)
  watcher.on('ready', build)
  watcher.on('change', build)
}

const watch = {
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
  watch
}
