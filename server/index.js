const http = require('http')
const app = require('./app')
const server = http.createServer(app)

server.listen(8001, () => {
  console.log('Server is running at Port 8001')
})
