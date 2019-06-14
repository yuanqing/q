const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommand = require('../utilities/execute-shell-command')
const log = require('../utilities/log')

const commands = {
  css: `mkdir -p build/css && tachyons ${constants.css.inputFilePath} > ${
    constants.css.outputFilePath
  } && purgecss --css ${constants.css.outputFilePath} --content '${
    constants.html.outputGlob
  }' --out ${
    constants.css.outputDirectoryPath
  } && csso --comments none --input ${constants.css.outputFilePath} --output ${
    constants.css.outputFilePath
  }`,
  html: `html-minifier --input-dir src --file-ext html --output-dir ${
    constants.outputDirectoryPath
  } --collapse-whitespace --minify-css --minify-js --remove-comments --remove-redundant-attributes --remove-tag-whitespace`,
  images: `imagemin '${constants.images.inputGlob}' --out-dir ${
    constants.images.outputDirectoryPath
  }`
}

const build = {
  command: 'build [type]',
  builder: function (yargs) {
    yargs.positional('type', {
      type: 'string',
      choices: ['css', 'html', 'images']
    })
  },
  handler: async function ({ type }) {
    log.info('Building…')
    if (typeof type === 'undefined') {
      await executeShellCommand(commands.html, { quiet: true }).catch(
        errorHandler
      )
      await executeShellCommand(commands.css, { quiet: true }).catch(
        errorHandler
      )
      await executeShellCommand(commands.images, { quiet: true }).catch(
        errorHandler
      )
    } else {
      await executeShellCommand(commands[type], { quiet: true }).catch(
        errorHandler
      )
    }
    log.success('Built')
    return Promise.resolve()
  }
}

module.exports = {
  commands,
  build
}
