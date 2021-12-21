const mongoose = require('mongoose');

const uri = 'mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/DatabaseDA?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true})
    console.log('DB Connected...!')
}

module.exports = connectDB