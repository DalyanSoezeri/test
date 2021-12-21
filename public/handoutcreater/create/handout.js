function searchforVoca(){
    window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}

var socket = io();

function connect(id){
    socket.on('connect', function() {
        socket.emit('getclassesofuser', id);
    });
    
}

socket.on("getbackclasses", function(data){
//classname
let option;
data.forEach(element=>{
    option = document.createElement("option");
    option.value = element.classname;
    option.innerHTML = element.classname;
    option.setAttribute("name",element.classname)

    document.getElementById("selectclass").appendChild(option)
})
})