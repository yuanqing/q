const vinylFs = require('vinyl-fs')
const VinylFtp = require('vinyl-ftp')

const constants = require('../constants')

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

module.exports = function (options) {
  return {
    title: 'ftp',
    task: function () {
      return ftpUpload(options)
    }
  }
}
