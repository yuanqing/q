const chokidar = require('chokidar')

const buildCommands = require('./build')
const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const specification = {
  css: {
    glob: constants.css.inputGlob,
    command: buildCommands.css
  },
  html: {
    glob: constants.html.inputGlob,
    command: buildCommands.html
  },
  images: {
    glob: constants.images.inputGlob,
    command: buildCommands.images
  }
}

function executeWatch ({ glob, command }) {
  const watcher = chokidar.watch([glob])
  watcher.on('change', async function () {
    await executeShellCommands([command]).catch(errorHandler)
  })
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
