const chalk = require('chalk')
const readline = require('readline')

const info = logFactory(chalk.bold.black.bgWhite(' INFO '))
const success = logFactory(chalk.bold.black.bgGreen(' SUCCESS '))
const error = logFactory(chalk.bold.black.bgRed(' ERROR '))

function logFactory (prefix) {
  return function (text) {
    console.log(`${prefix} ${text}`)
  }
}

function clearLine () {
  readline.moveCursor(process.stdout, 0, -1)
  readline.clearLine(process.stdout, 1)
}

module.exports = {
  info,
  success,
  error,
  clearLine
}
