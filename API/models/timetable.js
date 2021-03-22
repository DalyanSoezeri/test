const mongoose = require('mongoose')

const timetableSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    timetable: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Timetable', timetableSchema)