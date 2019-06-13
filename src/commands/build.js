const constants = require('../utilities/constants')
const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
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
      await executeShellCommands([commands.html, commands.images]).catch(
        errorHandler
      )
      await executeShellCommands([commands.css]).catch(errorHandler)
    } else {
      await executeShellCommands([commands[type]]).catch(errorHandler)
    }
    log.success('Built')
    return Promise.resolve()
  }
}

module.exports = {
  commands,
  build
}
