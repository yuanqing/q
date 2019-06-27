const sourceDirectoryPath = 'src'
const mediaDirectoryPath = 'media'
const outputDirectoryPath = 'build'

module.exports = {
  sourceDirectoryPath,
  mediaDirectoryPath,
  outputDirectoryPath,
  servePort: 4242,
  css: {
    inputGlob: `${sourceDirectoryPath}/css/**/*.css`,
    inputFilePath: `${sourceDirectoryPath}/css/style.css`,
    outputDirectoryPath: `${outputDirectoryPath}/css`,
    outputFilePath: `${outputDirectoryPath}/css/style.css`
  },
  html: {
    inputGlob: `${sourceDirectoryPath}/**/*.html`,
    outputGlob: `${outputDirectoryPath}/**/*.html`
  },
  images: {
    inputGlob: `${mediaDirectoryPath}/**/*.{gif,jpg,png}`,
    outputDirectoryPath: `${outputDirectoryPath}/media`
  }
}
