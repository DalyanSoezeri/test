

function getdata(){
const fs = require('fs');
var content
var contentAsString = fs.readFileSynch('events.json', "utf-8")
content = JSON.parse(contentAsString)
return content
}


