
var socket = io();

socket.on('connect', function(){
    var name = window.location.href.split('=')[1];
    socket.emit('searchforDBvocas',name);
});

socket.on('gameNamesDataDBvocas', function(data){
    for(var i = 0; i < Object.keys(data).length; i++){
       
      var div1 = document.createElement("div");
      div1.setAttribute("class", "col-md-6 col-xl-3");

      var article = document.createElement("article");
      article.setAttribute("class", "stat-cards-item");

      div1.appendChild(article);
    var div2 = document.createElement("div")
    div2.setAttribute("class", "stat-cards-icon purple");
    article.appendChild(div2);

       var img1 = document.createElement('img')
       img1.width=35
        img1.src="../Pictures/paper.png"
        
        div2.appendChild(img1)

        var div3 = document.createElement("div");
        div3.setAttribute("class", "stat-cards-info")
        article.appendChild(div3);

        var p1 = document.createElement("p");
        p1.setAttribute("class", "stat-cards-info__num")
        p1.innerHTML = data[i].name;
        div3.appendChild(p1);

        var p2 = document.createElement("p");
        p2.setAttribute("class", "stat-cards-info__title")
        p2.innerHTML = data[i].name;
        div3.appendChild(p1);
         var button2 = document.createElement("button");
        button2.innerHTML = "Start";
        button2.setAttribute("class","stat-cards-icon purple")
        button2.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button2.setAttribute('id', 'gameButton');
        article.appendChild(button2);
        
        document.getElementById("vocas").appendChild(div1);
    }
});



function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}

function searchforVoca(){
    window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}