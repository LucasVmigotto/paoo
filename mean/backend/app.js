const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Client = require('./models/Client')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose can\'t be connected', err))

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
    .then(client => {
      res.status(201)
        .json({
          clientId: client._id,
          name: client.name,
          phone: client.phone,
          email: client.email
        })
    })
})

app.get('/api/clients', (_, res) => {
  Client
    .find()
    .then(doc => {
      res
        .status(200)
        .json(doc.map(el => ({
          clientId: el._id,
          name: el.name,
          email: el.email,
          phone: el.phone,
        })))
    })
})

app.delete('/api/clients/:clientId', (req, res) => {
  Client
    .deleteOne({ _id: req.params.clientId})
    .then(response => {
      if (response) {
        res.status(200)
          .json({ message: 'Client successfully removed' })
      }
    })
})

module.exports = app
