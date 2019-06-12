#!/usr/bin/env node

const yargs = require('yargs')
const { build } = require('./commands/build')
const { clean } = require('./commands/clean')
const { ftp } = require('./commands/ftp')
const { fix } = require('./commands/fix')
const { lint } = require('./commands/lint')
const { serve } = require('./commands/serve')
const { watch } = require('./commands/watch')

yargs
  .scriptName('q')
  .command(build)
  .command(clean)
  .command(ftp)
  .command(fix)
  .command(lint)
  .command(serve)
  .command(watch)
  .demandCommand()
  .help()
  .version()
  .parse()
