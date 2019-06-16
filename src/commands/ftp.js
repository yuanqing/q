const vinylFs = require('vinyl-fs')
const VinylFtp = require('vinyl-ftp')

const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const log = require('../utilities/log')

const command = {
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
    return new Promise(function (resolve) {
      log.info('Uploading...')
      const connection = new VinylFtp({
        host,
        user,
        password,
        parallel: 10,
        log: console.log
      })
      vinylFs
        .src([`${constants.outputDirectoryPath}/**`], {
          base: `./${constants.outputDirectoryPath}`,
          buffer: false
        })
        .pipe(connection.dest(directory))
        .on('error', errorHandler)
        .on('end', function () {
          log.success('Uploaded')
          resolve()
        })
    })
  }
}

module.exports = {
  command
}
