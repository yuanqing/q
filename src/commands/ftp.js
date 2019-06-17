const vinylFs = require('vinyl-fs')
const VinylFtp = require('vinyl-ftp')

const constants = require('../constants')
const executeTasks = require('../execute/execute-tasks')

function ftpUpload ({ host, user, password, directory }) {
  return new Promise(function (resolve, reject) {
    const connection = new VinylFtp({
      host,
      user,
      password,
      parallel: 10
    })
    vinylFs
      .src([`${constants.outputDirectoryPath}/**`], {
        base: `./${constants.outputDirectoryPath}`,
        buffer: false
      })
      .pipe(connection.dest(directory))
      .on('error', reject)
      .on('end', resolve)
  })
}

const command = {
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
  handler: async function ({ host, user, password, directory }) {
    return executeTasks([
      {
        title: 'ftp',
        task: function () {
          return ftpUpload({ host, user, password, directory })
        }
      }
    ])
  }
}

module.exports = {
  command
}
