var socket = io();

function connect(userid){
    alert(userid);
    socket.on('connect', function(){
        socket.emit('requestDbNames', userid);
    });
}

socket.on('gameNamesData', function(data){
    for(var i = 0; i < Object.keys(data).length; i++){
        var div = document.getElementById('game-list');
        
        var image=document.createElement('img');
        image.width=350;
        image.height=240;
        image.src="https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg";

        div.appendChild(image);

        var center = document.createElement("center");

        div.appendChild(center);

        var divcpb3 = document.createElement('div');
        divcpb3.setAttribute("class","pb-3");
        center.appendChild(divcpb3);

        var divalign = document.createElement('div');
        divalign.setAttribute("class","align-items-center");
       
        divcpb3.appendChild(divalign);

        var divpb1 = document.createElement('div');
        divpb1.setAttribute("class","pb-1");
        divalign.appendChild(divpb1);

        var alinkd = document.createElement('a');
        divpb1.appendChild(alinkd);

        var button2 = document.createElement("button");
        button2.innerHTML = "Start";
        button2.setAttribute("class","btn")
        button2.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button2.setAttribute('id', 'gameButton');
        divalign.appendChild(button2);

        var h2h5 = document.createElement("h2");
        h2h5.setAttribute("class","h2h5");
        h2h5.innerHTML=data[i].name;
        alinkd.appendChild(h2h5);

       
        

        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));


    }
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}
