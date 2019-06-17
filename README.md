# @yuanqing/q [![npm Version](https://badgen.net/npm/v/@yuanqing/q)](https://www.npmjs.org/package/@yuanqing/q)

> An opinionated CLI for creating lightweight, vanilla HTML/CSS websites

## Features

- Leverage [Tachyons](https://github.com/tachyons-css/tachyons/) for CSS
- Minification and compression of HTML, CSS and images
- Watch and rebuild on changes
- Linting and auto-formatting
- Deploying via FTP

## Installation

```
$ npm install --global @yuanqing/q
```

## Usage

```
$ q --help
q <command>

Commands:
  q build [types..]  Build HTML, CSS, images
  q clean            Delete the `build` directory and other artefacts
  q fix [types..]    Auto-format HTML and CSS
  q ftp              Upload the `build` directory
  q lint [types..]   Lint CSS
  q serve            Serve the `build` directory
  q watch [types..]  Watch and rebuild HTML, CSS and images on changes

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Directory structure

- All implementation code is placed in the `src` directory.
  - CSS files must match the glob pattern `src/css/**/*.css`. The entry CSS file is `src/css/style.css`.
  - HTML files must match the glob pattern `src/**/*.html`.
- Images are placed in the `media` directory and must match the glob pattern `media/**/*.{gif,jpg,png}`.
- HTML, CSS, and images are output to the `build` directory

## License

[MIT](LICENSE.md)
