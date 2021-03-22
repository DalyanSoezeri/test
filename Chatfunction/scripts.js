$(document).ready(function(){

   var socket = io.connect('http://localhost:3000')
   //var socket = io.connect("localhost:3000", {transports: ['websocket']});

   var username = $('#username')

   var changeusername=$("#changeusername")

   var box = $('#box')

   //var message = $('#message')
   var message = document.getElementById("message");

   var buttonmessage= $("#buttonmessage")

   var members = $('members');

   buttonmessage.click(function(){
      console.log("Click");
      console.log(message.value);
      socket.emit('new_message',{message:message.value})
   })


   socket.on('new_message',(data)=>{
      //box.html('');
      //message.val('');
      //console.log('write');
      const date = new Date;
      const mess=data.message+"";

      //alert(document.getElementById("username").value)
      
     //alert(document.getElementById('username').value+"..."+localStorage.getItem("username"))
      if(document.getElementById('username').value!=localStorage.getItem("username")){
         box.append('<div class="d-flex justify-content-start mb-4"> <div class="msg_cotainer">'+ data.message+'<span class="msg_time">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')
      }
      else
      {
         if(mess.includes('vivo')){
            box.append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'+'<iframe width="560" height="315" src='+`${data.message}`+' frameborder="0" allowfullscreen></iframe>'+'<span class="msg_time_send">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')
         }
         else{
            if(mess.includes('youtube')){
               const id = mess.split('=')
               var link=`https://www.youtube.com/embed/${id[1]}?rel=0&amp;controls=1&amp;showinfo=0`;
               box.append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'+'<iframe width="560" height="315" src='+`${link}}`+' frameborder="0" allowfullscreen></iframe>'+'<span class="msg_time_send">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')
   
            }
            
            if(mess.includes('png')){
               box.append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'+'<img width="315" src='+`${data.message}>`+'<span class="msg_time_send">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')
   
            }
            else{
               if(mess.includes('jpg')){
                  box.append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'+'<img width="315" src='+`${data.message}>`+'<span class="msg_time_send">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')
               }
            }
            
         }
         box.append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'+ data.message+'<span class="msg_time_send">'+`${data.username}, ${date.getHours()}:${date.getMinutes()}`+'</span> </div> </div>')

      }



      //box.append('<div class="msg_cotainer_send">'+data.username +":"+data.message+"</div> <br> <br> <br>")
      message.value='';
      
   })

   changeusername.click(function(){
      members.append(' <li class="active"><div class="d-flex bd-highlight">  <div class="img_cont">     <img src="" class="rounded-circle user_img"> <span class="online_icon"></span>   </div><div class="user_info"> <span>'+`${username.value}`+'</span> </div></div></li>');
     
      socket.emit('change_username', {
         username:username.val()
      });
      localStorage.setItem('username',username.val())
      
   })

})