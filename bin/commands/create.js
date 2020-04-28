const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const ncp = require('ncp')
const fs = require('fs')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'project name：',
    validate: function (value) {
      if (value) {
        return true
      }
      return 'please input project name'
    },
  },
]

function copyDir(target, dest) {
  return new Promise((resolve, reject) => {
    ncp(target, dest, function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = function () {
  console.log(chalk.green('\nHi there, you look awesome today !!!\n'))
  return inquirer
    .prompt(questions)
    .then((answers) => {
      const cliroot = path.resolve(__dirname, '../../')
      const target = path.join(cliroot, 'packages/react')
      const dest = path.join(process.cwd(), answers.name)
      return copyDir(target, dest).then(() => {
        return {
          answers,
          dest,
          cliroot,
        }
      })
    })
    .then((props) => {
      const { cliroot, dest } = props
      return copyDir(path.join(cliroot, 'build'), path.join(dest, 'build')).then(() => props)
    })
    .then((props) => {
      const { cliroot, dest } = props
      ;[
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.gitignore',
        '.prettierignore',
        '.prettierrc',
        'webpack.config.js',
      ].forEach((item) => {
        fs.copyFileSync(path.join(cliroot, item), path.join(dest, item))
      })
      return props
    })
    .then(({ answers }) => {
      console.log(chalk.green(`\ncreate '${answers.name}' successfully! Happy coding!`))
    })
}
