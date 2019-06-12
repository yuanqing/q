const vinylFs = require('vinyl-fs')
const VinylFtp = require('vinyl-ftp')

const errorHandler = require('../utilities/error-handler')
const log = require('../utilities/log')

const ftp = {
  command: 'ftp',
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
  handler: async function ({ host, user, password, directory }) {
    log.info('Uploading…')
    const connection = new VinylFtp({
      host,
      user,
      password,
      parallel: 10,
      log: console.log
    })
    vinylFs
      .src(['./build/**'], { base: './build', buffer: false })
      .pipe(connection.dest(directory))
      .on('error', errorHandler)
    log.success('Uploaded')
    return Promise.resolve()
  }
}

module.exports = {
  ftp
}
