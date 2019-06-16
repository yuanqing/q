const constants = require('../constants')
const executeShellCommands = require('../execute/execute-shell-commands')

const shellCommands = [
  {
    title: 'clean',
    command: [
      `rm -rf ${constants.buildDirectoryPath}`,
      `find . -name .DS_Store -delete`,
      `find . -name .vscode -delete`,
      `find . -name *.js.map -delete`,
      `find . -name *.log -delete`
    ].join(' && ')
  }
]

const command = {
  command: 'clean',
  handler: async function () {
    return executeShellCommands(shellCommands)
  }
}

module.exports = {
  command
}
