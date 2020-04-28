#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')
const create = require('./commands/create')

const program = new Command()

program.version(pkg.version)

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <string>', 'flavour of pizza')

program
  .command('create')
  .description('create a react app')
  .action((source, destination) => {
    create().then((answers) => {
      const os = require('os')
      const address = require('address')

      const ip = Array.prototype.concat
        .apply([], Object.values(os.networkInterfaces()))
        .find((item) => item.family === 'IPv4' && !item.internal) || {
        address: '127.0.0.1',
      }

      console.log(address.ip(), ip)
      console.log(JSON.stringify(answers, null, '  '))
    })
  })

program
  .command('eject')
  .description('create a react app')
  .action((source, destination) => {
    console.log(source, destination)
  })

//minimist inquirer
program.parse(process.argv)
