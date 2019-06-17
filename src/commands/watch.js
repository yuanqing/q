const chokidar = require('chokidar')
const execa = require('execa')

const buildShellCommands = require('./build').shellCommands
const constants = require('../constants')
const executeTasks = require('../execute/execute-tasks')

const shellCommands = {
  html: {
    title: 'html',
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: buildShellCommands.html.command
  },
  css: {
    title: 'css',
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: buildShellCommands.css.command
  },
  images: {
    title: 'images',
    glob: [constants.images.inputGlob],
    shellCommand: buildShellCommands.images.command
  }
}

function watch (glob, shellCommand) {
  return new Promise(function () {
    const watcher = chokidar.watch(glob)
    function build () {
      execa.shell(shellCommand)
    }
    watcher.on('ready', build)
    watcher.on('change', build)
  })
}

const command = {
  command: 'watch [types..]',
  describe: 'Watch and rebuild HTML, CSS and images on changes',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', 'images'],
      default: ['html', 'css', 'images']
    })
  },
  handler: async function ({ types }) {
    return executeTasks(
      types.map(function (type) {
        const { title, glob, shellCommand } = shellCommands[type]
        return {
          title,
          task: function () {
            return watch(glob, shellCommand)
          }
        }
      })
    )
  }
}

module.exports = {
  command
}
