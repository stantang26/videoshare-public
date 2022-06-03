const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    vidname:{
      type:String,
      required: true
    },
    description:{
      type:String,
      required: true
    }
  })
module.exports = mongoose.model('Video', videoSchema)