const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');




app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.use('/static', express.static('Chatfunction'))

app.use(bodyParser.urlencoded({
    extended: true
}));


const Port = process.env.Port || 3000;


const server = app.listen(Port, () => console.log('Server Started'))


const io = require('socket.io')(server);

io.on('connection',socket=>{
    console.log('A new Client has been connected')

    socket.username = 'Anonymous';

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

