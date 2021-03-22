const express = require('express');
const app = express();
const connectDB=require('./DB')
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload')
const {v4: uuidV4} = require('uuid');

app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:true
}));

app.use(fileUpload())

connectDB();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/static', express.static('contact'))
app.use('/static4', express.static('newmain'))
app.use('/static2', express.static('Pictures'))
app.use('/static3', express.static('logginpage'))
app.use('/static5', express.static('Chatfunction'))
app.use('/static6', express.static('fullcalendar'))
app.use('/static7', express.static('documentsf'))


//Routes
app.get('/', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    //session.cle
    res.render('sign-in')
})

app.get('/sign-up', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('sign-up')
})

app.get('/sign-in', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('sign-in')
})

app.get('/calendar', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('calendar')
})

app.get('/blog', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('blog')
})
app.get('/documents', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('documents')
})

app.get('/createtimetbale', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('createtimetbale')
})
app.get('/createsubject', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('createsubject')
})

app.get('/index', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('index2')
})

app.get('/createtaskpbar', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('createtaskpbar')
})

app.get('/changetimetable', function(req, res){
    //res.sendFile(path.join(__dirname + '/newmain/sign-in.html'))
    res.render('changetimetable')
})

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', require('./API/User'));
const Port = process.env.Port || 3000;

//app.listen(Port, () => console.log('Server Started'))

const server = app.listen(Port, () => console.log('Server Started'))


const io = require('socket.io')(server);

io.on('connection',socket=>{
    console.log('A new Client has been connected')

    socket.username = 'Anonymus';
    //socket.username = localStorage.getItem().username

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        console.log('user-connected', userId)
 
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
     })
     
    
    socket.on('new_message', data=>{
        io.sockets.emit('new_message', 
        {
            message:data.message,
            username:socket.username
        })
    })
    
    socket.on('change_username', data=>{
        socket.username = data.username;
    })

})

