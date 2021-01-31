const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');



app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function(req, res){
    //res.sendFile(path.join(__dirname + '/index.html'))
    res.redirect(`/${uuidV4()}`);
})


app.get('/:room',(req, res)=>{
    res.render('room', {roomId:req.params.room});
})


const Port = process.env.Port || 3000;

server.listen(Port, () => console.log('Server Started'))

io.on('connection',socket=>{
    console.log('A new Client has been connected')


    socket.on('join-room', (roomId, userId) => {
       socket.join(roomId)
       socket.to(roomId).broadcast.emit('user-connected', userId)
       console.log('user-connected', userId)

       socket.on('disconnect', () => {
           socket.to(roomId).broadcast.emit('user-disconnected', userId)
       })
    })

})
