const mongoose=require('mongoose');

const user = new mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    username2:{
        type: String
    }
});

module.exports = Users = mongoose.model('user', user)
