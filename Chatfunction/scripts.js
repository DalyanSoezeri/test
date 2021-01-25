$(document).ready(function(){

   var socket = io.connect('http://localhost:3000')
   //var socket = io.connect("localhost:3000", {transports: ['websocket']});

   var username = $('#username')

   var changeusername=$("#changeusername")

   var box = $('#box')

   //var message = $('#message')
   var message = document.getElementById("message");

   var buttonmessage= $("#buttonmessage")

   

   buttonmessage.click(function(){
      console.log("Click");
      console.log(message.value);
      socket.emit('new_message',{message:message.value})
   })


   socket.on('new_message',(data)=>{
      //box.html('');
      //message.val('');
      //console.log('write');
      box.append('<p>'+data.username +":"+data.message+"</p>")
      message.value='';
   })

   changeusername.click(function(){
      socket.emit('change_username', {
         username:username.val()
      });
   })

})