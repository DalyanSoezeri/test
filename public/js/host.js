var socket = io();

//When host connects to server
function connect(id){
    socket.on('connect', function() {
        //Tell server that it is host connection
        socket.emit('host-join', id);
    });
}

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function(data){
    
    document.getElementById('players').value = "";
    
    for(var i = 0; i < data.length; i++){
        document.getElementById('players').value += data[i].name + "\n";
    }
    
});

//Tell server to start game if button is clicked
function startGame(){
    socket.emit('startGame');
}
function endGame(){
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function(id){
    console.log('Game Started!');

    ////hier muss man auf hostgame
    document.getElementById("hostid").value=id;
    document.getElementById("startb").click();
    //window.location.href="/host/game/" + "?id=" + id;
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Redirect user to 'join game' page
});

