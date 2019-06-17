const execa = require('execa')

const executeTasks = require('./execute-tasks')

async function executeShellCommands (commands) {
  const tasks = commands.map(function ({ title, command }) {
    return {
      title,
      task: function () {
        return execa.shell(command)
      }
    }
  })
  return executeTasks(tasks)
}

module.exports = executeShellCommands
