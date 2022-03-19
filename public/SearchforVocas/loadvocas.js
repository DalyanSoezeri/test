
var socket = io();

function connect(userid){
    socket.on('connect', function(){
        var name = window.location.href.split('=')[1];
        socket.emit('searchforDBvocas',name, userid);
    });
}

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
          img1.src="../../Pictures/paper.png"
          
          div2.appendChild(img1)
  
          var div3 = document.createElement("div");
          div3.setAttribute("class", "stat-cards-info")
          article.appendChild(div3);
  
          // <p class="stat-cards-info__num">1478 286</p>
          // <p class="stat-cards-info__title">Total visits</p>
  
          var p1 = document.createElement("p");
          p1.setAttribute("class", "stat-cards-info__num")
          p1.innerHTML = data[i].item.name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          div3.appendChild(p1);
  
          var p2 = document.createElement("p");
          p2.setAttribute("class", "stat-cards-info__title")
          p2.innerHTML = data[i].item.class;
          div3.appendChild(p2);
  
          var button2 = document.createElement("button");
          button2.innerHTML = "Start";
         
          
          var form = document.createElement('form');
          form.setAttribute('method', `GET`)
          form.setAttribute('action', `/startvoca`)
          article.appendChild(form)
          
          var input = document.createElement('input');
          input.setAttribute('type', `hidden`)
          input.setAttribute('name', `idofvoca`)
          input.setAttribute("value", `${data[i].item.id}`)
          form.appendChild(input)
  
          var buttonstart = document.createElement('button');
          buttonstart.setAttribute("class", "stat-cards-icon purple");
          buttonstart.innerText="Start"
          buttonstart.setAttribute("type", "submit")
          form.appendChild(buttonstart)
          
         
          document.getElementById("vocas").appendChild(div1);
    }
});
