const inquirer = require('inquirer')

console.log('Hi there, your look awesome today !!!')

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

module.exports = function () {
  return inquirer.prompt(questions)
}
