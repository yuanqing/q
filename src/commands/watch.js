const chokidar = require('chokidar')

const commands = require('./build')
const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const specification = {
  css: {
    directory: 'src/**/*.css',
    command: commands.css
  },
  html: {
    directory: 'src/**/*.html',
    command: commands.html
  },
  images: {
    directory: 'media/**/*.{gif,jpg,png}',
    command: commands.images
  }
}

function executeWatch ({ directory, command }) {
  const watcher = chokidar.watch([directory])
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
