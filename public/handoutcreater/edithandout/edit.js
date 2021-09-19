var socket = io();


socket.on('connect', function(){
    var id = window.location.href.split('=')[1];
    socket.emit('getHandout', id);
});

socket.on('getHandout', function(data){
    
    // var pic = document.createElement('img');
    //     pic.width='500';
    //     //pic.setAttribute("download", `${data[0].name}.${data[0].filetype}`)
    //     pic.src=`data:${data[0].filetype};charset=utf-8;base64,${data[0].file.toString('base64')}`
    //     document.getElementById('Pictures').appendChild(pic)
    //     document.getElementById('Text').innerHTML=data[0].text

    //alert(document.getElementById("editor").innerHTML)
   // alert(data[0].text)
    document.getElementById('title').value=data[0].title;
    document.getElementById('idofhandout').value=data[0]._id;
    //document.getElementById('keine').innerHTML=`${data[0].text}`;

});


