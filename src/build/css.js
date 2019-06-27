const constants = require('../constants')

module.exports = function () {
  return {
    title: 'css',
    task: `mkdir -p build/css && tachyons ${constants.css.inputFilePath} > ${
      constants.css.outputFilePath
    } && purgecss --css ${constants.css.outputFilePath} --content '${
      constants.html.outputGlob
    }' --out ${
      constants.css.outputDirectoryPath
    } && csso --comments none --input ${
      constants.css.outputFilePath
    } --output ${constants.css.outputFilePath}`
  }
}
