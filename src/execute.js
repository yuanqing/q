const execa = require('execa')
const Listr = require('listr')

async function executeTasks (tasks, { concurrent = true } = {}) {
  const t = tasks.map(function ({ title, task }) {
    if (typeof task === 'string') {
      return {
        title,
        task: function () {
          return execa.shell(task)
        }
      }
    }
    return { title, task }
  })
  return new Listr(t, { concurrent, exitOnError: false })
    .run()
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}

module.exports = executeTasks
