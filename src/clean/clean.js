const constants = require('../constants')

module.exports = function () {
  return {
    title: 'clean',
    task: [
      `rm -rf ${constants.outputDirectoryPath}`,
      'find . -name .DS_Store -delete',
      'find . -name .vscode -delete',
      'find . -name *.js.map -delete',
      'find . -name *.log -delete'
    ].join(' && ')
  }
}
