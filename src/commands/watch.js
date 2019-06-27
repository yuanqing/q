const chokidar = require('chokidar')
const execa = require('execa')

const buildShellCommands = require('./build').shellCommands
const constants = require('../constants')
const executeTasks = require('../execute-tasks')

const shellCommands = {
  html: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    task: buildShellCommands.html.task
  },
  css: {
    glob: [constants.css.inputGlob, constants.html.inputGlob],
    task: buildShellCommands.css.task
  },
  images: {
    glob: [constants.images.inputGlob],
    task: buildShellCommands.images.task
  }
}

function watch (glob, task) {
  return new Promise(function () {
    const watcher = chokidar.watch(glob)
    const build = typeof task === 'string' ? function () {
      execa.shell(task)
    } : task
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
        const { glob, task } = shellCommands[type]
        return {
          title: type,
          task: function () {
            return watch(glob, task)
          }
        }
      })
    )
  }
}

module.exports = {
  command
}
