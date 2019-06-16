const chokidar = require('chokidar')
const execa = require('execa')

const buildShellCommands = require('./build').shellCommands
const constants = require('../constants')
const executeFunctions = require('../execute/execute-functions')

const shellCommands = {
  css: {
    title: 'css',
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: buildShellCommands.css.command
  },
  html: {
    title: 'html',
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    shellCommand: buildShellCommands.html.command
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
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['css', 'html', 'images'],
      default: ['css', 'html', 'images']
    })
  },
  handler: async function ({ types }) {
    return executeFunctions(
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
