const errorHandler = require('../utilities/error-handler')
const executeShellCommands = require('../utilities/execute-shell-commands')
const log = require('../utilities/log')

const commands = {
  css:
    'mkdir -p build/css && tachyons src/css/style.css > build/css/style.css && purgecss --css build/css/style.css --content build/**/*.html --out build/css && csso --comments none --input build/css/style.css --output build/css/style.css',
  html:
    'html-minifier --input-dir src --file-ext html --output-dir build --collapse-whitespace --minify-css --minify-js --remove-comments --remove-redundant-attributes --remove-tag-whitespace',
  images: "imagemin 'media/**/*.{gif,jpg,png}' --out-dir build/media"
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
