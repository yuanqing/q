const openBrowser = require('./open-browser')
const serve = require('./serve')
const execute = require('../execute')

module.exports = {
  command: 'serve',
  describe: 'Serve the `build` directory',
  builder: function (yargs) {
    yargs.option('open', {
      alias: ['o'],
      type: 'boolean'
    })
  },
  handler: async function ({ open }) {
    if (open) {
      return execute([openBrowser(), serve()])
    }
    return execute([serve()])
  }
}
