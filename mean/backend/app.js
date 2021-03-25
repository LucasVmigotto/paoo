const app = require('express')()
const bodyParser = require('body-parser')

const clients = [
  {
    id: 1,
    name: 'John Doe',
    phone: '99999999',
    email: 'john@mail.com'
  },
  {
    id: 2,
    name: 'Mary',
    phone: '99999999',
    email: 'Mary@mail.com'
  }
]

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
  const client = {
    id: clients[clients.length - 1].id + 1,
    ...req.body
  }
  clients.push(client)
  res
    .status(201)
    .json(client)
})

app.get('/api/clients', (_, res) => {
  res
    .status(200)
    .json(clients)
})

module.exports = app
