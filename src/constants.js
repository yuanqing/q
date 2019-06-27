const src = 'src'
const media = 'media'
const build = 'build'

module.exports = {
  sourceDirectoryPath: src,
  mediaDirectoryPath: media,
  outputDirectoryPath: build,
  servePort: 4242,
  css: {
    inputGlob: `${src}/css/**/*.css`,
    inputFilePath: `${src}/css/style.css`,
    outputDirectoryPath: `${build}/css`,
    outputFilePath: `${build}/css/style.css`
  },
  html: {
    inputGlob: `${src}/**/*.html`,
    outputGlob: `${build}/**/*.html`
  },
  images: {
    inputGlob: `${media}/**/*.{gif,jpg,png}`,
    outputDirectoryPath: `${build}/media`
  }
}
