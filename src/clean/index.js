const clean = require('./clean')
const execute = require('../execute')

module.exports = {
  command: 'clean',
  describe: 'Delete the `build` directory and other artefacts',
  handler: async function () {
    return execute([clean()])
  }
}
