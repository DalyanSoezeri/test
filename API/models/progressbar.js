const mongoose = require('mongoose')

const progressbarsSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    progressbar: {
      type: String,
      required: true
    },
    nameoftask: {
      type: String,
      required: true
    },
    amountoftasks: {
      type: String,
      required: true
    },
    numberdonetasks: {
      type: String
    }
})

module.exports = mongoose.model('Progressbar', progressbarsSchema)