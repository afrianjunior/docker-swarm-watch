const docker = require('./docker-sock')

let result = []

let nodes = []
let tasks = []
let services = []

async function getNodes () {
  nodes = await docker('nodes')

  return nodes
}

async function getTasks () {
  tasks = await docker('tasks')

  return tasks
}

async function getServices () {
  services = await docker('services')

  return services
}

module.exports = async function () {
  const nodes = await getNodes()
  const tasks = await getTasks()
  const services = await getServices()

  tasks.forEach(task => {
    task['Service'] = services.find(({ ID }) => ID === task.ServiceID)
  });

  nodes.forEach(node => {
    node['Tasks'] = tasks.filter(({ NodeID, DesiredState }) => NodeID === node.ID && DesiredState !== 'shutdown')
  })

  result = nodes

  return result
}