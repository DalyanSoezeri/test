const mongoose=require('mongoose');

const contact = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String
    }
});

module.exports = Contacts = mongoose.model('contact', contact)
