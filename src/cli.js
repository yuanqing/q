#!/usr/bin/env node

const yargs = require('yargs')

yargs
  .scriptName('q')
  .command(require('./commands/build').command)
  .command(require('./commands/clean').command)
  .command(require('./commands/fix').command)
  .command(require('./commands/ftp').command)
  .command(require('./commands/lint').command)
  .command(require('./commands/serve').command)
  .command(require('./commands/watch').command)
  .demandCommand()
  .strict()
  .help()
  .version()
  .parse()
