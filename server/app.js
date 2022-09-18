const express = require('express')
const client = require('./database')
const shortid = require('shortid')
const cors = require('cors')
const baseUrl = 'http:localhost:8001'

client.connect()
const app = express()
app.use(cors())
app.use(express.json())

//routes

//get user

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email)
    const result = await client.query(`select * from user_Data  WHERE user_data.email = $1`, [email])
    //   console.log(result.rows)

    res.json({
      user: result.rows[0],
    })
  } catch (error) {
    console.log(error.message)
  }
})

//create user

app.post('/signup', async (req, res) => {
  try {
    const { name, email, number, password } = req.body

    console.log(name)
    const newUser = await client.query(
      `INSERT INTO user_Data(name,email,number,password) VALUES($1,$2,$3,$4) RETURNING *`,
      [name, email, number, password]
    )

    res.json({
      user: newUser.rows,
    })
  } catch (error) {
    console.log(error.message)
  }
})

//create short Links
app.post('/createLink', async (req, res) => {
  try {
    let { urlCode, longUrl, shortUrl, date } = req.body
    const url = shortid.generate()
    shortUrl = baseUrl + '/' + url
    console.log(name)
    const newLink = await client.query(
      `INSERT INTO link_URL(urlCode,longUrl,shortUrl,date) VALUES($1,$2,$3,$4) RETURNING *`,
      [urlCode, longUrl, shortUrl, date]
    )

    res.json({
      shortLink: newLink.rows,
    })
  } catch (error) {
    console.log(error.message)
  }
})
app.get('/', (req, res) => {
  res.json({
    msg: 'hello',
  })
})

module.exports = app
