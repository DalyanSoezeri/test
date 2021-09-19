const mongoose=require('mongoose');

const user = new mongoose.Schema({
    name:{
        type: String
    },
    file:{
        type: String
    },
    filetype:{
        type: String
    },
    text:{
        type: String
    }
});

module.exports = Handouts = mongoose.model('handout', user)
