const execa = require('execa')
const Listr = require('listr')

async function executeShellCommands (commands) {
  const tasks = commands.map(function ({ title, command }) {
    return {
      title,
      task: function () {
        return execa.shell(command)
      }
    }
  })
  return new Listr(tasks, { concurrent: true, exitOnError: false })
    .run()
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}

module.exports = executeShellCommands
