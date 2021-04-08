const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Client = require('./models/Client')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.error('Mongoose can\'t be connected'))

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next()
})

app.post('/api/clients', (req, res) => {
  const client = new Client({
    ...req.body
  })
  client.save()
  res
    .status(201)
    .json(client)
})

app.get('/api/clients', (_, res) => {
  Client
    .find()
    .then(doc => {
      res
        .status(200)
        .json(doc)
    })
})

module.exports = app
