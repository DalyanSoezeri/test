const mongoose=require('mongoose');

const user = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
});

module.exports = Users = mongoose.model('user', user)
