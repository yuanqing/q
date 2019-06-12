const log = require('./log')

function errorHandler (error) {
  log.error(error.message)
  process.exit(1)
}

module.exports = errorHandler
