const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false,
    default: '00000000'
  },
  email: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Client', clientSchema)
