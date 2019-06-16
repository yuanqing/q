const constants = require('../constants')
const executeShellCommands = require('../execute/execute-shell-commands')

const shellCommands = {
  css: {
    title: 'css',
    command: `mkdir -p build/css && tachyons ${constants.css.inputFilePath} > ${
      constants.css.outputFilePath
    } && purgecss --css ${constants.css.outputFilePath} --content '${
      constants.html.outputGlob
    }' --out ${
      constants.css.outputDirectoryPath
    } && csso --comments none --input ${
      constants.css.outputFilePath
    } --output ${constants.css.outputFilePath}`
  },
  html: {
    title: 'html',
    command: `html-minifier --input-dir src --file-ext html --output-dir ${
      constants.outputDirectoryPath
    } --collapse-whitespace --minify-css --minify-js --remove-comments --remove-redundant-attributes --remove-tag-whitespace`
  },
  images: {
    title: 'images',
    command: `imagemin '${constants.images.inputGlob}' --out-dir ${
      constants.images.outputDirectoryPath
    }`
  }
}

const command = {
  command: 'build [types..]',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['css', 'html', 'images'],
      default: ['css', 'html', 'images']
    })
  },
  handler: function ({ types }) {
    return executeShellCommands(
      types.map(function (type) {
        return shellCommands[type]
      })
    )
  }
}

module.exports = {
  shellCommands,
  command
}
