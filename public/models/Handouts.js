const mongoose=require('mongoose');

const handout = new mongoose.Schema({
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
    },
    userid:{
        type: String
    }
});

module.exports = Handouts = mongoose.model('handout', handout)
