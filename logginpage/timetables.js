const mongoose=require('mongoose');

const timtable = new mongoose.Schema({
    username:{
        type: String
    },
    timetable:{
        type: String
    }
});

module.exports = Timetable = mongoose.model('user', timetable)
