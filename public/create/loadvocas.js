/* <div class="col-md-6 col-xl-3">
<article class="stat-cards-item">
  <div class="stat-cards-icon purple">
    <i data-feather="file" aria-hidden="true"></i>
  </div>
  <div class="stat-cards-info">
    <p class="stat-cards-info__num">1478 286</p>
    <p class="stat-cards-info__title">Total visits</p>
    <p class="stat-cards-info__progress">
      <span class="stat-cards-info__profit danger">
        <i data-feather="trending-down" aria-hidden="true"></i>1.64%
      </span>
      Last month
    </p>
  </div>
</article>
</div> */

var socket = io();

socket.on('connect', function(){
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('gameNamesData', function(data){//--------------wichtig
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
       img1.width=50
        img1.src="../../Pictures/paper.png"
        div2.appendChild(img1)

        var div3 = document.createElement("div");
        div3.setAttribute("class", "stat-cards-info")
        article.appendChild(div3);

        // <p class="stat-cards-info__num">1478 286</p>
        // <p class="stat-cards-info__title">Total visits</p>

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
        button2.setAttribute("class","btn")
        button2.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button2.setAttribute('id', 'gameButton');
        article.appendChild(button2);
        
        var form = document.createElement('form');
        form.setAttribute('method', `GET`)
        form.setAttribute('action', `/deletevoca`)
        article.appendChild(form)
        
        var input = document.createElement('input');
        input.setAttribute('type', `hidden`)
        input.setAttribute('name', `idofvoca`)
        input.setAttribute("value", `${data[i].id}`)
        form.appendChild(input)

        var buttondelete = document.createElement('button');
        buttondelete.setAttribute('type', `submit`)
        buttondelete.innerText="delete"
        //buttondelete.setAttribute("onclick", "reload()")
        form.appendChild(buttondelete)

        document.getElementById("vocas").appendChild(div1);

        // var div = document.getElementById('game-list');
        
        // var image=document.createElement('img');
        // image.width=350;
        // image.height=240;
        // image.src="https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg";

        // div.appendChild(image);

        // var center = document.createElement("center");

        // div.appendChild(center);

        // var divcpb3 = document.createElement('div');
        // divcpb3.setAttribute("class","pb-3");
        // center.appendChild(divcpb3);

        // var divalign = document.createElement('div');
        // divalign.setAttribute("class","align-items-center");
       
        // divcpb3.appendChild(divalign);

        // var divpb1 = document.createElement('div');
        // divpb1.setAttribute("class","pb-1");
        // divalign.appendChild(divpb1);

        // var alinkd = document.createElement('a');
        // divpb1.appendChild(alinkd);

        // var button2 = document.createElement("button");
        // button2.innerHTML = "Start";
        // button2.setAttribute("class","btn")
        // button2.setAttribute('onClick', "startGame('" + data[i].id + "')");
        // button2.setAttribute('id', 'gameButton');
        // divalign.appendChild(button2);

        // var h2h5 = document.createElement("h2");
        // h2h5.setAttribute("class","h2h5");
        // h2h5.innerHTML=data[i].name;
        // alinkd.appendChild(h2h5);

       
        

        // div.appendChild(document.createElement("br"));
        // div.appendChild(document.createElement("br"));


    }
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}
