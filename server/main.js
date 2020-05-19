const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('fastify-static')
const path = require('path')
const io = require('socket.io')(fastify.server)
const init = require('./services')

const publicPath = path.join(__dirname, '../public')

let userOnline = 0
let broadcastContainer = null

fastify
  .register(
    fastifyStatic,
    {
      root: publicPath,
      prefix: '/'
    }
  )

fastify.get('/', function (req, reply) {
  reply
    .status(200)
    .sendFile('index.html', publicPath)
})

io.on('connection', (client) => {
  userOnline++
  sendBroadcast(client)

  client.on('disconnect', () => {
    userOnline--
    sendBroadcast(client)
  })
})

function sendBroadcast (client) {
  clearInterval(broadcastContainer)
  if (userOnline > 0) {
    broadcastContainer = setInterval(async () => {
      const result = await init()
      client.emit('node', result)
    }, 1000)
  }
}


// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080, '0.0.0.0')
    
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start()