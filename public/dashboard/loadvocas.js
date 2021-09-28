
var socket = io();

socket.on('connect', function(){
    socket.emit('requestDbNames');//Get database names to display to user
    socket.emit('requestHandouts');
});

socket.on('gameNamesData', function(data){//--------------wichtig
    for(var i = 0; i < 8; i++){

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
         var button2 = document.createElement("button");
        button2.innerHTML = "Start";
        button2.setAttribute("class","btn")
        button2.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button2.setAttribute('id', 'gameButton');
        article.appendChild(button2);
        
       
        document.getElementById("vocas").appendChild(div1);
    }
});


socket.on('requestHandouts', function(data){
    for(var i = 0; i < 8; i++){
        console.log(data[i]);

        var tr1 = document.createElement("tr");
        var td1 = document.createElement('td');
      
        tr1.appendChild(td1);
        var label1 = document.createElement("label");
        label1.setAttribute("class","users-table__checkbox");
        td1.appendChild(label1);

      
        var div1 = document.createElement('div');
        div1.setAttribute("class", "categories-table-img");
        label1.appendChild(div1)
        
        var picture1 = document.createElement("picture");
        div1.appendChild(picture1);
        var source1 = document.createElement('source');
        source1.setAttribute('srcset', `data:${data[i].filetype};charset=utf-8;base64,${data[i].file.toString('base64')}` );
        source1.setAttribute('type', "image/webp" )

        picture1.appendChild(source1)

        var img1 = document.createElement('img')
        img1.setAttribute("src",`data:${data[i].filetype};charset=utf-8;base64,${data[i].file.toString('base64')}`)

        source1.appendChild(img1)

        var td2 = document.createElement('td');
        td2.innerHTML=" "+data[i].title;

        tr1.appendChild(td2)

        var td3 = document.createElement('td');
        td3.innerHTML=" "+data[i].date;

        tr1.appendChild(td3)
      
        var td4 = document.createElement('td');
      

        var span1 = document.createElement('span')
        span1.setAttribute("class", "p-relative" );
        td4.appendChild(span1)

        var buttonstart = document.createElement('button');
        buttonstart.setAttribute('onclick', `startGamehandout("${data[i]._id}")`)
        buttonstart.innerText="use"
        span1.appendChild(buttonstart)


        var form = document.createElement('form');
        form.setAttribute('method', `GET`)
        form.setAttribute('action', `/deletehandout`)
        span1.appendChild(form)
        
        var input = document.createElement('input');
        input.setAttribute('type', `hidden`)
        input.setAttribute('name', `idofhandout`)
        input.setAttribute("value", `${data[i]._id}`)
        form.appendChild(input)

        var buttondelete = document.createElement('button');
        buttondelete.setAttribute('type', `submit`)
        buttondelete.innerText="delete"
        buttondelete.setAttribute("onclick", "reload()")
        form.appendChild(buttondelete)

        var buttonedit = document.createElement('button');
        buttonedit.setAttribute('onclick', `edithandout("${data[i]._id}")`)
        buttonedit.innerText="edit"
        span1.appendChild(buttonedit)

        tr1.appendChild(td4)

        document.getElementById("handouts").appendChild(tr1);
       
    }
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}

function edithandout(data){
    window.location.href="/handoutcreater/edithandout/" + "?id=" + data;
 }
 


 function startGamehandout(data){
     window.location.href="/handoutcreater/choosenho/" + "?id=" + data;
 }

 function searchforVoca(){
    window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}