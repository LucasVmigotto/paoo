const { Router } = require('express')
const Client = require('../models/Client')

const router = Router()

router.post('', (req, res) => {
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

router.put('/:clientId', (req, res) => {
  const client = new Client({
    _id: req.params.clientId,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  })
  Client.updateOne({ _id: req.params.clientId }, client)
    .then(response => {
      console.log(response)
      res.status(200)
        .json({ message: 'Client Successfully updated' })
    })
})

router.get('', (_, res) => {
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

router.get('/:clientId', (req, res) => {
  Client.findById(req.params.clientId)
    .then(client => {
      if (client) {
        res.status(200)
          .json(client)
      } else {
        res.status(404)
          .json({ message: 'Client not found' })
      }
    })
})

router.delete('/:clientId', (req, res) => {
  Client
    .deleteOne({ _id: req.params.clientId})
    .then(response => {
      if (response) {
        res.status(200)
          .json({ message: 'Client successfully removed' })
      }
    })
})

module.exports = {
  router
}
