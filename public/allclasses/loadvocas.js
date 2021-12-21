
var socket = io();

function connect(userid){
    id = userid;
    localStorage.setItem("userid", userid+"");
    socket.on('connect', async function(){
        socket.emit('getclassesofuser', userid);
    });
}

//var dictclass=[{"class":"","handouts":[{}], "vocas":[{}]}]
var id;

socket.on("getbackclasses", async function(data){
 
 for (let index = 0; index < data.length; index++) {

    const element = data[index];
    
    var details = document.createElement("details");
    details.setAttribute("id", `${element.classname}`)
    var summ = document.createElement("summary");
    details.appendChild(summ)
    var summtitle = document.createElement("h2")
    summtitle.setAttribute("class", "main-title")
    summtitle.innerHTML=element.classname;
    summ.innerHTML = `<h2 class="main-title">${element.classname}</h2>`;   
    
    var divg, divh;
    
    divg = document.createElement("div");
    divg.setAttribute("id", "game"+element.classname);

    details.appendChild(divg)


var divrows = document.createElement("div");
divrows.setAttribute("class", "rows");

var divcol = document.createElement("div");
divcol.setAttribute("class","col-lg-9")
divrows.appendChild(divcol)

var usertable = document.createElement("div");
usertable.setAttribute("class", "users-table table-wrapper")
divcol.appendChild(usertable)

var posts = document.createElement("table");
posts.setAttribute("class", "posts-table")
usertable.appendChild(posts)

var fthead = document.createElement("thead");
posts.appendChild(fthead)

var tre = document.createElement("tr");
tre.setAttribute("class", "users-table-info")
fthead.appendChild(tre)

var th1 = document.createElement("td");
th1.innerHTML="&nbsp;Thumbnail";
tre.appendChild(th1)
var th2 = document.createElement("td");
th2.innerHTML="Title";
tre.appendChild(th2)
var th3 = document.createElement("td");
th3.innerHTML="Class";
tre.appendChild(th3)
var th4 = document.createElement("td");
th4.innerHTML = "Date";
tre.appendChild(th4)
var th5 = document.createElement("td");
th5.innerHTML = "Action";
tre.appendChild(th5)






    divh = document.createElement("tbody");
    divh.setAttribute("id", "handout"+element.classname);
    posts.appendChild(divh);
    details.appendChild(divrows)

    document.getElementById("classes").appendChild(details)
    document.getElementById("classes").appendChild(document.createElement("br"))
        
 }

 socket.emit('requestDbNames', id);//Get database names to display to user
 socket.emit('requestHandouts', id);
   
})

socket.on('gameNamesData', async function(data){

    for(var i = 0; i < data.length; i++){


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

//         // <p class="stat-cards-info__num">1478 286</p>
//         // <p class="stat-cards-info__title">Total visits</p>

         var p1 = document.createElement("p");
         p1.setAttribute("class", "stat-cards-info__num")
         p1.innerHTML = data[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
         div3.appendChild(p1);

         var p2 = document.createElement("p");
         p2.setAttribute("class", "stat-cards-info__title")
         p2.innerHTML = data[i].class;
         div3.appendChild(p2);

        //  var button2 = document.createElement("button");
        //  button2.innerHTML = "Start";
       
        
         var form = document.createElement('form');
         form.setAttribute('method', `GET`)
         form.setAttribute('action', `/startvoca`)
         article.appendChild(form)
      
         var input = document.createElement('input');
         input.setAttribute('type', `hidden`)
         input.setAttribute('name', `idofvoca`)
         input.setAttribute("value", `${data[i].id}`)
         form.appendChild(input)

         var buttonstart = document.createElement('button');
         buttonstart.setAttribute("class", "stat-cards-icon purple");
         buttonstart.innerText="Start"
         buttonstart.setAttribute("type", "submit")
         form.appendChild(buttonstart)
        
         if(data[i].class !== undefined){
            document.getElementById("game"+data[i].class).appendChild(div1);
         }
     }

});


 socket.on('requestHandouts', async function(data){

    for(var i = 0; i < data.length; i++){
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

        var td21 = document.createElement('td');
        td21.innerHTML=" "+data[i].class;

        tr1.appendChild(td21)

        var td3 = document.createElement('td');
        td3.innerHTML=" "+data[i].date;

        tr1.appendChild(td3)
      
        var td4 = document.createElement('td');
        tr1.appendChild(td4)

        var form1 = document.createElement('form');
        form1.setAttribute('method', `GET`)
        form1.setAttribute('action', `/usehandout`)
        td4.appendChild(form1)
        
        var input1 = document.createElement('input');
        input1.setAttribute('type', `hidden`)
        input1.setAttribute('name', `idofhandout`)
        input1.setAttribute("value", `${data[i]._id}`)
        form1.appendChild(input1)

        var usehandout = document.createElement('button');
        usehandout.setAttribute('type', `submit`)
        usehandout.setAttribute("class", "stat-cards-icon purple")
        usehandout.innerText="Use"
        form1.appendChild(usehandout)

        document.getElementById("handout"+data[i].class).appendChild(tr1);
       
    }
});




function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}

function edithandout(data){
    window.location.href="/handoutcreater/edithandout/" + "?id=" + data;
 }
 


 function startGamehandout(data){
     window.location.href="/views/choosenho.html/" + "?id=" + data;
 }

 function searchforVoca(){
    window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}