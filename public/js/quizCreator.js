var socket = io();
var questionNum = 0; //Starts at two because question 1 is already present

function setBGColor(id){
    var randColor = randomColor();
    document.getElementById('question-field').style.backgroundColor = randColor;
    
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

        document.getElementById("selectclass").appendChild(option)
    })
})

function updateDatabase(userid){
    var questions = [];
    var name = document.getElementById('name').value;
    for(var i = 1; i <= questionNum; i++){
        var question = document.getElementById('q' + i).value;
        var answer1 = document.getElementById(i + 'a1').value;
        // answer1=answer1.toLowerCase();
        // console.log(answer1);
        if(document.getElementById(i + 'a2')==null){
            var answer2 = "";   
        }
        else{
            var answer2 = document.getElementById(i + 'a2').value
        }
        
        // var answer3 = document.getElementById(i + 'a3').value;
        // var answer4 = document.getElementById(i + 'a4').value;
        var correct = document.getElementById('correct' + i).value;
        var answers = [answer1, answer2]//, answer3, answer4];
        questions.push({"question": question, "answers": answers, "correct": correct})
    }
    
    var quiz = {id: 0, "name": name, "questions": questions, "userid": userid, "class":document.getElementById("selectclass").value};
    socket.emit('newQuiz', quiz);
}

var insertinto = 0;
function translate(data){
    insertinto=data;
    socket.emit("translateword",document.getElementById("q"+data).value);

}

socket.on("getbacktosender", function(data){
   if(questionNum==0){
    document.getElementById("1a1").value = data;
   }
   else{
    document.getElementById(insertinto+"a1").value = data;
   }
})

function addQuestion(){
    if(questionNum==0){
        questionNum += 2;
    }
    else{
        questionNum += 1;
    }
    var questionsDiv = document.getElementById('allQuestions');
    
    var newQuestionDiv = document.createElement("div");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    
    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    // var answer2Label = document.createElement('label');
    // var answer2Field = document.createElement('input');
    
    // var answer3Label = document.createElement('label');
    // var answer3Field = document.createElement('input');
    
    // var answer4Label = document.createElement('label');
    // var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    
    questionLabel.innerHTML = "Word " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    
    answer1Label.innerHTML = "translation: ";
    // answer2Label.innerHTML = " Answer 2: ";
    // answer3Label.innerHTML = "Answer 3: ";
    // answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";
    correctLabel.style.visibility='hidden'
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    // answer2Field.setAttribute('id', String(questionNum) + "a2");
    // answer2Field.setAttribute('type', 'text');
    // answer3Field.setAttribute('id', String(questionNum) + "a3");
    // answer3Field.setAttribute('type', 'text');
    // answer4Field.setAttribute('id', String(questionNum) + "a4");
    // answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('value', '1')
    correctField.setAttribute('type', 'number');
    correctField.style.visibility='hidden'
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    // newQuestionDiv.appendChild(answer2Label);
    // newQuestionDiv.appendChild(answer2Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(answer3Label);
    // newQuestionDiv.appendChild(answer3Field);
    // newQuestionDiv.appendChild(answer4Label);
    // newQuestionDiv.appendChild(answer4Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);

    var buttondel = document.createElement("button");
    buttondel.innerHTML="Del"
    buttondel.setAttribute("onclick", `delchild(${questionNum})`)
    newQuestionDiv.appendChild(buttondel);
    
    //setColour
    var buttont = document.createElement("button");
    buttont.innerHTML="Translate"
    buttont.setAttribute("onclick", `translate(${questionNum})`)
    newQuestionDiv.appendChild(buttont);
   
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
    newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";
    }
}


function addSentence(){
    if(questionNum==0){
        questionNum += 2;
    }
    else{
        questionNum += 1;
    }
    
    var questionsDiv = document.getElementById('allQuestions');
    
    var newQuestionDiv = document.createElement("div");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    questionField.style.width="25%"
    
    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    
    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');
    answer2Field.setAttribute("placeholder", "Tipp: If it is necessary")
    
    // var answer3Label = document.createElement('label');
    // var answer3Field = document.createElement('input');
    
    // var answer4Label = document.createElement('label');
    // var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    
    questionLabel.innerHTML = "Sentence " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    
    answer1Label.innerHTML = "Currect Word: ";
    answer2Label.innerHTML = " Answer 2: ";
    // answer3Label.innerHTML = "Answer 3: ";
    // answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";
    correctLabel.style.visibility='hidden'
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    // answer3Field.setAttribute('id', String(questionNum) + "a3");
    // answer3Field.setAttribute('type', 'text');
    // answer4Field.setAttribute('id', String(questionNum) + "a4");
    // answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('value', '1')
    correctField.setAttribute('type', 'number');
    correctField.style.visibility='hidden'
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    newQuestionDiv.appendChild(answer2Label);
    newQuestionDiv.appendChild(answer2Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(answer3Label);
    // newQuestionDiv.appendChild(answer3Field);
    // newQuestionDiv.appendChild(answer4Label);
    // newQuestionDiv.appendChild(answer4Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);

    var buttondel = document.createElement("button");
    buttondel.innerHTML="Del"
    buttondel.setAttribute("onclick", `delchild(${questionNum})`)
    newQuestionDiv.appendChild(buttondel);
    
   
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
    newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";
    }
}


socket.on('startGameFromCreator', function(data){
    window.location.href = "../../host/?id=" + data;
});

function randomColor(){
    
    var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function delchild(numofchild){
    
    if(questionNum-=1>1){
        questionNum-=1;
    }

var parent = document.getElementById('allQuestions');
//var liToKill = parent.childNodes[numofchild];
//liToKill.parentNode.removeChild( liToKill );
parent.removeChild( parent.childNodes[numofchild+1] )

}



let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              rowObject.forEach(element => {
                  if(questionNum===0){
                    document.getElementById("q1").value=element.Deutsch;
                    document.getElementById("1a1").value=element.English;
                    questionNum++;
                }
                else{
                    addQuestionofgameinDB(element.Deutsch, element.English)
                }
              });
         });
        }
    }
});

function addQuestionofgameinDB(question, awnser){
    
    questionNum += 1;
    
    var questionsDiv = document.getElementById('allQuestions');
    
    var newQuestionDiv = document.createElement("div");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    
    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    // var answer2Label = document.createElement('label');
    // var answer2Field = document.createElement('input');
    
    // var answer3Label = document.createElement('label');
    // var answer3Field = document.createElement('input');
    
    // var answer4Label = document.createElement('label');
    // var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    
    questionLabel.innerHTML = "Word " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    questionField.value=question;
    answer1Label.innerHTML = "translation: ";
    // answer2Label.innerHTML = " Answer 2: ";
    // answer3Label.innerHTML = "Answer 3: ";
    // answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";
    correctLabel.style.visibility='hidden'
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer1Field.value=awnser;
    // answer2Field.setAttribute('id', String(questionNum) + "a2");
    // answer2Field.setAttribute('type', 'text');
    // answer3Field.setAttribute('id', String(questionNum) + "a3");
    // answer3Field.setAttribute('type', 'text');
    // answer4Field.setAttribute('id', String(questionNum) + "a4");
    // answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('value', '1')
    correctField.setAttribute('type', 'number');
    correctField.style.visibility='hidden'
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    // newQuestionDiv.appendChild(answer2Label);
    // newQuestionDiv.appendChild(answer2Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(answer3Label);
    // newQuestionDiv.appendChild(answer3Field);
    // newQuestionDiv.appendChild(answer4Label);
    // newQuestionDiv.appendChild(answer4Field);
    // newQuestionDiv.appendChild(document.createElement('br'));
    // newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);

    var buttondel = document.createElement("button");
    buttondel.innerHTML="Del"
    buttondel.setAttribute("onclick", `delchild(${questionNum})`)
    newQuestionDiv.appendChild(buttondel);
    
   
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
    newQuestionDiv.style.backgroundColor = randomColor();
}



function searchforVoca(){
    window.location.href="/SearchforVocas/" + "?title=" + document.getElementById("titleofvoca").value;
  }
