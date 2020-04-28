
const chalk = require('chalk');
const os = require('os');

const ip = Array.prototype.concat.apply([], Object.values(os.networkInterfaces()))
  .find(item => item.family === 'IPv4' && !item.internal) || { address: '127.0.0.1' }

class DonePlugin {
  constructor(config) {
    this.config = config
  }
  apply(compiler) {
    compiler.hooks.done.tap('Done Plugin', (stats) => {
      setTimeout(() => {
        const { port = '8080', openPage = '/' } = this.config;
        const path = port + openPage;
        console.log('\n  App running at: ');
        console.log('  - Local  :', chalk.green('http://localhost:' + path))
        console.log('  - Network:', chalk.green('http://' + ip.address + ':' + path))
      }, 100)
    });
  }
}

module.exports = DonePlugin;
