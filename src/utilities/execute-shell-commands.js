const execa = require('execa')

function executeShellCommands (commands) {
  return Promise.all(commands.map(executeShellCommand))
}

function executeShellCommand (command) {
  return new Promise(function (resolve, reject) {
    const childProcess = execa.shell(command, {
      env: { FORCE_COLOR: true }
    })
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('exit', function (code) {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
        return
      }
      resolve()
    })
  })
}

module.exports = executeShellCommands
