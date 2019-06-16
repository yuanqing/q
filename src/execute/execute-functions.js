const Listr = require('listr')

async function executeFunctions (functions) {
  return new Listr(functions, { concurrent: true, exitOnError: false })
    .run()
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}

module.exports = executeFunctions
