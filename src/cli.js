#!/usr/bin/env node

const yargs = require('yargs')

yargs
  .scriptName('q')
  .command(require('./build'))
  .command(require('./clean'))
  .command(require('./fix'))
  .command(require('./ftp'))
  .command(require('./lint'))
  .command(require('./serve'))
  .command(require('./watch'))
  .demandCommand()
  .strict()
  .help()
  .version()
  .parse()
