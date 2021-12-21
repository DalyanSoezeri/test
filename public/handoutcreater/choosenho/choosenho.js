var socket = io();


function connect(idofhandout){
    socket.on('connect', function(){
        socket.emit('getHandout', idofhandout);
    });    
}

socket.on('getHandout', function(data){
    
    var pic = document.createElement('img');
        pic.width='500';
        //pic.setAttribute("download", `${data[0].name}.${data[0].filetype}`)
        pic.src=`data:${data[0].filetype};charset=utf-8;base64,${data[0].file.toString('base64')}`
        document.getElementById('Pictures').appendChild(pic)
        document.getElementById('box').innerHTML=data[0].text

        //alert(data[0].text)
});

let menu = null;
document.addEventListener('DOMContentLoaded', function(){
    //make sure the right click menu is hidden
    menu = document.querySelector('.menu');
    menu.classList.add('off');
    
    //add the right click listener to the box
    let box = document.getElementById('box');
    box.addEventListener('contextmenu', showmenu);
    
    //add a listener for leaving the menu and hiding it
    menu.addEventListener('mouseleave', hidemenu);
    
    //add the listeners for the menu items
    addMenuListeners();
});

function setColour(){
    // hidemenu();
    // let clr = ev.target.id;
    // document.getElementById('box').style.backgroundColor = clr;

    //alert(document.getSelection().toString())

    socket.emit("translateword", document.getSelection().toString());

}

socket.on("getbacktosender", function(data){
    // <div class="modal-wrap" id="translfield">

    //<p id="translationwords"></p>

    //</div>

    var div = document.createElement("div");

    div.setAttribute("class", "modal-wrap");

    var p = document.createElement("p");

    p.innerHTML = data;

    div.appendChild(p);

    document.getElementById("translfield").appendChild(div);

    document.getElementById("modal-btn").checked="true";
})

function showmenu(ev){
    //stop the real right click menu
    ev.preventDefault(); 
    //show the custom menu
    console.log( ev.clientX, ev.clientY );
    menu.style.top = `${ev.clientY - 20}px`;
    menu.style.left = `${ev.clientX - 20}px`;
    menu.classList.remove('off');
}



function hidemenu(ev){
    menu.classList.add('off');
    menu.style.top = '-200%';
    menu.style.left = '-200%';
}