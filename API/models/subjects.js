const mongoose = require('mongoose')

const subjectsSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    subject: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Subjects', subjectsSchema)