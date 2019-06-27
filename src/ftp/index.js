const execute = require('../execute')
const ftp = require('./ftp')

module.exports = {
  command: 'ftp',
  describe: 'Upload the `build` directory',
  builder: function (yargs) {
    yargs.option('host', {
      alias: ['h'],
      type: 'string',
      demandOption: true
    })
    yargs.option('user', {
      alias: ['u'],
      type: 'string',
      demandOption: true
    })
    yargs.option('password', {
      alias: ['pass', 'p'],
      type: 'string',
      demandOption: true
    })
    yargs.option('directory', {
      alias: ['dir', 'd'],
      type: 'string',
      demandOption: true
    })
  },
  handler: async function (options) {
    return execute([ftp(options)])
  }
}
