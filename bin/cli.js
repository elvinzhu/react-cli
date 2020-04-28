#!/usr/bin/env node

const { Command } = require('commander')
const chalk = require('chalk')
const pkg = require('../package.json')
const create = require('./commands/create')

const program = new Command()

program.version(pkg.version)

program
  .command('create')
  .description('create a react app')
  .action(() => {
    create().then((answers) => {})
  })

program
  .command('eject')
  .description('create a react app')
  .action((source, destination) => {
    console.log(chalk.red('command not supported yet!'))
  })

//minimist inquirer
program.parse(process.argv)
