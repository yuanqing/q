const constants = require('../constants')
const executeTasks = require('../execute-tasks')

const shellCommands = [
  {
    title: 'clean',
    task: [
      `rm -rf ${constants.outputDirectoryPath}`,
      `find . -name .DS_Store -delete`,
      `find . -name .vscode -delete`,
      `find . -name *.js.map -delete`,
      `find . -name *.log -delete`
    ].join(' && ')
  }
]

const command = {
  command: 'clean',
  describe: 'Delete the `build` directory and other artefacts',
  handler: async function () {
    return executeTasks(shellCommands)
  }
}

module.exports = {
  command
}
