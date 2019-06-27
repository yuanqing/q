const chokidar = require('chokidar')
const execa = require('execa')

function watch (glob, task) {
  return new Promise(function () {
    const watcher = chokidar.watch(glob)
    // prettier-ignore
    const build =
      typeof task === 'string'
        ? function () {
          execa.shell(task)
        }
        : task
    watcher.on('ready', build)
    watcher.on('change', build)
  })
}

module.exports = watch
