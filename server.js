const express = require('express');
const app = express();
//const connectDB=require('./DB')
const bodyParser = require('body-parser');
const path = require('path');



//app.use(fileUpload())

//connectDB();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static('style'))
app.use('/static2', express.static('startpage'))
app.use('/static3', express.static('pictures'))
app.use('/static4', express.static('contact'))

app.get('/', function(req, res){
    // res.render('index', {Titel:'', Status: '', Genre:'', Premier:'', Summary:'', linktowebsite:'', 
    // linkofpicture:'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1610ecb1e61%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1610ecb1e61%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22130.7%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    //  TitelofPreviousEp:'P', TitelofNextEp:'N', summarypEp: '', summarynEp: '', pEppicture:'', pEpSEp:"", nEpSEp:""})
    res.render('start')
})

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', require('./script'));
const Port = process.env.Port || 3000;

const server = app.listen(Port, () => console.log('Server Started'))

