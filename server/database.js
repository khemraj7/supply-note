const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'khemraj_7',
  database: 'demo',
})

client.on('connect', () => {
  console.log('Database Connected')
})

client.on('end', () => {
  console.log('connection end')
})

module.exports = client
