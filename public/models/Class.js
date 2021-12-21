const mongoose=require('mongoose');

const classsch = new mongoose.Schema({
    classname:{
        type: String
    },
    userid:{
        type: String
    }
});

module.exports = Class = mongoose.model('class', classsch)
