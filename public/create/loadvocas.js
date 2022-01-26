var socket = io();

function connect(userid){
  socket.on('connect', function(){
      socket.emit('requestDbNames', userid);
  });
}

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
        p1.innerHTML = data[i].name;
        div3.appendChild(p1);

        var p2 = document.createElement("p");
        p2.setAttribute("class", "stat-cards-info__title")
        p2.innerHTML = data[i].name;
        div3.appendChild(p1);

      //   <div class="dots-nav">
 
      //   <div class="dd-dots" tabindex="-1">
      //     <div class="three-dots"></div>
      //     <div class="dd">
      //       <a href="#"><div>click here for a scam</div></a>
      //       <a href="#"><div>even more scams</div></a>
      //       <a href="#"><div>still some money left?</div></a>
      //     </div>
      //   </div>
      // </div>

     
        var divmenunav = document.createElement("div")

        divmenunav.setAttribute("class","dots-nav")
        article.appendChild(divmenunav)

        var ddcontainer = document.createElement("div")

        ddcontainer.setAttribute("class","dd-dots")
        ddcontainer.setAttribute("tabindex","-1")

        divmenunav.appendChild(ddcontainer)

        var threedots = document.createElement("div")

        threedots.setAttribute("class","three-dots")

        ddcontainer.appendChild(threedots)


        var dddiv = document.createElement("div")

        dddiv.setAttribute("class","dd")

        threedots.appendChild(dddiv)

        var center = document.createElement("center");
        dddiv.appendChild(center);

      
      
      
       var form2 = document.createElement('form');
        form2.setAttribute('method', `GET`)
        form2.setAttribute('action', `/startvoca`)
        
        
        var input2 = document.createElement('input');
        input2.setAttribute('type', `hidden`)
        input2.setAttribute('name', `idofvoca`)
        input2.setAttribute("value", `${data[i].id}`)
        form2.appendChild(input2)

        var buttonstart = document.createElement('button');
        buttonstart.setAttribute("class", "stat-cards-icon purple");
        buttonstart.innerText="Start"
        buttonstart.setAttribute("type", "submit")
        form2.appendChild(buttonstart)
      
      
      
      
        center.appendChild(form2);
        
        var form = document.createElement('form');
        form.setAttribute('method', `GET`)
        form.setAttribute('action', `/deletevoca`)
        center.appendChild(form)
        
        var input = document.createElement('input');
        input.setAttribute('type', `hidden`)
        input.setAttribute('name', `idofvoca`)
        input.setAttribute("value", `${data[i].id}`)
        form.appendChild(input)

        var buttondelete = document.createElement('button');
        buttondelete.setAttribute('type', `submit`)
      buttondelete.setAttribute("class", "stat-cards-icon purple");
        buttondelete.innerText="Delete"
        //buttondelete.setAttribute("onclick", "reload()")
        form.appendChild(buttondelete)



        var formedit = document.createElement('form');
        formedit.setAttribute('method', `GET`)
        formedit.setAttribute('action', `/editvoca`)
        center.appendChild(formedit)
        
        var inputedit = document.createElement('input');
        inputedit.setAttribute('type', `hidden`)
        inputedit.setAttribute('name', `idofvoca`)
        inputedit.setAttribute("value", `${data[i].id}`)
        formedit.appendChild(inputedit)

        var buttonedit = document.createElement('button');
        buttonedit.setAttribute('type', `submit`)
        buttonedit.setAttribute("class", "stat-cards-icon purple");
        buttonedit.innerText="Edit"
        //buttondelete.setAttribute("onclick", "reload()")
        formedit.appendChild(buttonedit)

        document.getElementById("vocas").appendChild(div1);
    }
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}

function editvoca(data){
  window.location.href="/EditVoca/" + "?id=" + data;
}

function searchforVoca(){
  window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}