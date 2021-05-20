const { Router } = require('express')
const multer = require('multer')
const Client = require('../models/Client')

const MIME_TYPE_EXT_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/bmp': 'bmp'
}

const storage = multer.diskStorage({
  destination: (_req, file, callback) =>
    callback(
      MIME_TYPE_EXT_MAP[file.mimetype]
        ? null
        : new Error('Invalid Mime Type'),
      'backend/images'
    ),
  filename: (req, file, callback) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-')
    const ext = MIME_TYPE_EXT_MAP[file.mimetype]
    callback(null, `${name}-${Date.now()}.${ext}`)
  }
})

const router = Router()

router.post('', multer({ storage }).single('image') , (req, res) => {
  const imageURL= `${req.protocol}://${req.get('host')}`
  const client = new Client({
    ...req.body,
    imageURL: `${imageURL}/images/${req.file.filename}`
  })
  client.save()
    .then(client => {
      res.status(201)
        .json({
          clientId: client._id,
          name: client.name,
          phone: client.phone,
          email: client.email,
          imageURL: client.imageURL
        })
    })
})

router.put('/:clientId', multer({ storage }).single('image'), (req, res) => {
  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : req.body.imageUrl
  const client = new Client({
    _id: req.params.clientId,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    imageUrl
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
          imageURL: el.imageURL
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
