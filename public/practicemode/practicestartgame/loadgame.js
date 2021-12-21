var socket = io();

function connect(id){
  socket.on('connect', function(){
      socket.emit('searchforDBvocaswithID', id);//Get database names to display to user
  });
}

var game;
var wrongvocabs = [];
var indexofquestion=0;

function playgametolearn(){
  
  document.getElementById("totranslate").innerHTML = game[0].questions[indexofquestion].question
  
}



socket.on('gameQuestiondata', function(data){//--------------wichtig
  game = data;
  playgametolearn();
});
var all;
function nextquestion(){
  //abfrage ob es richtig ist
  if(game[0].questions[indexofquestion].answers[0]==document.getElementById('enteredvocab').value){
    cuteAlert({
      type: "success",
      title: "Correct",
      message: "",
    })
   //cuteAlert("success", "Success Title", "Success Message", "Okay")
    if(game[0].questions.length==indexofquestion+1){
      
      endofgame();
    }
  }
  else{
    cuteAlert({
      type: "error",
      title: "False",
      message: game[0].questions[indexofquestion].answers[0]
    })
    wrongvocabs.push({"question": game[0].questions[indexofquestion].question, "awnser": game[0].questions[indexofquestion].answers[0]})
    if(game[0].questions.length==indexofquestion+1){
     
      endofgame()
    }
  }

  document.getElementById('enteredvocab').value="";
  indexofquestion++;
  playgametolearn();
  
}

function endofgame(){
  var h5wrong = document.createElement("h5");
  h5wrong.setAttribute("class","main-title")
    h5wrong.innerHTML="Wrong Vocas";
    document.getElementById("getwrongvocas").appendChild(h5wrong) 
    var h5translation = document.createElement("h5");
    h5translation.setAttribute("class","main-title")
      h5translation.innerHTML="English -> Deutsch";
      document.getElementById("getwrongvocas").appendChild(h5translation)


  wrongvocabs.forEach(element => {
    var h5 = document.createElement("h5");
    h5.setAttribute("class","main-title")
      h5.innerHTML=element.question+","+element.awnser;
      document.getElementById("getwrongvocas").appendChild(h5)
  });

  document.getElementById("totranslate").innerHTML = "End";
  //<h5 class="main-title" id="downloadable"></h5>
  
}

function previousquestion(){
  document.getElementById('enteredvocab').value="";
  indexofquestion--;
  playgametolearn();
}


function searchforVoca(){
  window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
}