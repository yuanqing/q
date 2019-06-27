const ejs = require('ejs')
const fs = require('fs')
const globby = require('globby')
const htmlMinifier = require('html-minifier')

const constants = require('../constants')

const sourceDirectoryRegularExpression = new RegExp(
  `^${constants.sourceDirectoryPath}`
)

async function buildHtml () {
  const filePaths = await globby([constants.html.inputGlob])
  return Promise.all(
    filePaths.map(async function (filePath) {
      const html = await render(filePath)
      const minifiedHtml = minify(html)
      const outputFilePath = filePath.replace(
        sourceDirectoryRegularExpression,
        constants.outputDirectoryPath
      )
      return write(outputFilePath, minifiedHtml)
    })
  )
}

function render (filePath) {
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

function minify (html) {
  return htmlMinifier.minify(html, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true
  })
}

function write (outputFilePath, html) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(outputFilePath, html, function (error) {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

module.exports = function () {
  return {
    title: 'html',
    task: buildHtml
  }
}
