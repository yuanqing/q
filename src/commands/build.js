const ejs = require('ejs')
const htmlMinifier = require('html-minifier')
const globby = require('globby')

const constants = require('../constants')
const executeTasks = require('../execute-tasks')

function renderHtml (filePath) {
  return new Promise(function (resolve, reject) {
    ejs.renderFile(filePath, {}, {}, function (error, result) {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

function minifyHtml (html) {
  return htmlMinifier.minify(html, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true
  })
}

async function buildHtml () {
  const filePaths = await globby([constants.html.inputGlob])
  return Promise.all(filePaths.map(async function(filePath) {
    const html = await renderHtml(filePath)
    const minified = minifyHtml(html)
    console.log(minified)
  }))
}

const shellCommands = {
  html: {
    title: 'html',
    task: buildHtml
  },
  css: {
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
  },
  images: {
    title: 'images',
    task: `imagemin '${constants.images.inputGlob}' --out-dir ${
      constants.images.outputDirectoryPath
    }`
  }
}

const command = {
  command: 'build [types..]',
  describe: 'Build HTML, CSS, images',
  builder: function (yargs) {
    yargs.positional('types', {
      type: 'array',
      choices: ['html', 'css', 'images'],
      default: ['html', 'css', 'images']
    })
  },
  handler: function ({ types }) {
    return executeTasks(
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
