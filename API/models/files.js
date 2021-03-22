const mongoose = require('mongoose')

const filesSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    fname: {
      type: String,
      required: true
    },
    file: {
        type: Buffer,
        required: true
    },
    filetype: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Files', filesSchema)