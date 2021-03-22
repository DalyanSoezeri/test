const express = require('express');
const mogoose = require('mongoose');
const User = require('../Users');
const route = express.Router();
const assert = require('assert');
const {Console, time} = require('console');
const app = express();
const crypt = require('crypto')
const bodyParser = require('body-parser');
const http = require('http');
const TimeTable = require('./models/timetable');
const Subject = require('./models/subjects');
const ProgressBar = require('./models/progressbar');
const session = require('express-session');


route.post('/post', async (req, res) => {
    const {username, password, username2} = req.body;
    let user = {};
    user.username = req.body.username;
    user.password = crypt.createHash('md5').update(req.body.password).digest('hex');
    user.username2 = req.body.username2;
    //console.log(req);
    console.log('Account creation: ')
    console.log(user);
    let userModel = new User(user);
    await userModel.save();
    //res.json(userModel);
    //res.redirect('../static4/sign-in.html');
    res.render('sign-in')
})

route.post('/deletett', async function (req,res){
    await TimeTable.deleteOne({_id: req.session.timetable_id})
    req.session.timet='';
    req.session.timetable_id='';
    res.render('theme', {username: req.session.username, ttime:'', ssubject: req.session.subject, pprogress: req.session.pprogressbar});
})

route.post('/deletett2', async function (req,res){
    await Subject.remove({_id: req.session.subject_id})
    req.session.ssubject='';
    req.session.subject_id='';
    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: '', pprogress: req.session.pprogressbar});
})

route.post('/deletett3', async function (req,res){
    await ProgressBar.remove({_id: req.session.pprogressbar_id})
    req.session.pprogressbar='';
    req.session.pprogressbar_id='';
    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: req.session.subject, pprogress: ''});
})


route.post('/timetable', async (req, res) => {
    const namedays = ' <p> <button style="margin-left: -15px;" type="button" class="btn btn-lg btn-default">'+`${req.body.tablename}`+'</button> </p> <div class="page-header"> <h1> <span class="label label-default" id="M">Monday</span> <span class="label label-primary" id="Thue">Thuesday</span> <span class="label label-success" id="W">Wednesday</span> <span class="label label-info" id="Thur">Thursday</span> <span class="label label-warning" id="F">Friday</span> </h1>'
    const head = namedays+'<div class="row"> <div class="col-md">   <table class="table">  <thead> ';
    const end = '  </thead></table></div></div>';
    var middle = "";
    var full = head + "";
    var week = ' <tr><th>Monday</th><th>Thuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr> ';
    let rows = 0;
    const days = ["Friday", "Thursday", "Wednesday", "Thuesday", "Monday"]
    var count = Object.keys(req.body).length - 1;

    count = 5;

    Object.entries(req.body).forEach(([k, v]) => {
        if (k != "tablename") {
            week = week.replace(days[count], v);
        }
        if (count == 0) {
            middle += week;
            count = 5;
            week = '<tr><th>Monday</th><th>Thuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr> ';
        }
        count--;
    })

    full += middle + end;
    //console.log(full);
    let timetable = {}


//    user.username=req.session.email
//             req.session.password = user.password
    

//console.log(req.session.userid)

    timetable.userid = req.session.userid;
    timetable.name = req.body.tablename;
    timetable.timetable = full;//später noch verschlüsseln
    req.session.timet=full;
    let tableModel = new TimeTable(timetable);
    await tableModel.save();


    await TimeTable.findOne({userid:req.session.userid}, function (err, res) {
       
            if (res === null) {
                
            } else {
               req.session.timet=res.timetable;
               req.session.timetable_id=res._id;
            }
        

    })

    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: req.session.ssubject, pprogress: req.session.pprogressbar});
})

route.get('/rendertotheme', async (req, res)=>{
   // res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject:req.session.ssubject})
    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: req.session.ssubject, pprogress: req.session.pprogressbar});
})

route.post('/removefile', async (req,res)=>{
   
    
    mongoClient.connect('mongodb+srv://SypProject:SypProjekt@spx.fsup9.mongodb.net/SPx?retryWrites=true&w=majority', { useNewUrlParser: true }, async (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('SPx')
            let collection = db.collection('files')
           
            await collection.remove({name: req.body.name})
            
            client.close()
        }

    })

    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: req.session.subject, pprogress: req.session.pprogressbar});
})

route.get('/renderdocuments', async (req, res)=>{
    
    mongoClient.connect('mongodb+srv://SypProject:SypProjekt@spx.fsup9.mongodb.net/SPx?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('SPx')
            let collection = db.collection('files')
            collection.find({userid:req.session.userid}).toArray((err, doc) => {
                if (err) {
                    console.log('err in finding doc:', err)
                }
                else {
                    let documents=[];
                    doc.forEach(element => {
                        documents.push({
                            data:`data:${element.filetype};charset=utf-8;base64,${element.file.toString('base64')}`,
                            filetype:element.filetype,
                            name:element.name
                           }); 
                    });
                   // let buffer = new Buffer.from(doc[2].file.buffer, 'binary')
                    //fs.writeFileSync('uploadedImage.'+doc[1].name, buffer)
                    res.render('documents', {data:documents})//{data:`data:${doc[2].name};charset=utf-8;base64,${doc[2].file.toString('base64')}`, filetype:doc[2].name});
                }
            })
            client.close()
        }

    })
})



route.get('/renderchangetimetable', async (req, res)=>{
    res.render('changetimetable', {ttime:req.session.timet})
})


route.post('/taskbar', async (req, res) => {
    var style1='<div class="progress">  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%"> <span class="sr-only"></span> </div></div>';
    var style2='<div class="progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%">  <span class="sr-only"></span> </div></div>';
    var name = '<p> <button type="button" class="btn btn-lg btn-default">'+`${req.body.nameoftask}`+'</button> </p>';
    var updateb = '<form action="updateTaskbar" method="POST"><input type="text" style="width: 5%;" class="form-control"  name="updateprogress" id="updateprogress">/'+`${req.body.maxtask}`+'<button style="margin-left: -15px; display: block;margin-left: auto;margin-right: -15px; margin-top: 5%;" type="submit" class="btn btn-lg btn-default">update Taskbar</button></form>'

    var styles = [style1,style2];

    var progressbar={};
    progressbar.userid=req.session.userid;
    progressbar.progressbar=name+styles[parseInt(req.body.choosestyle)]+updateb
    progressbar.nameoftask = req.body.nameoftask;
    progressbar.amountoftasks = req.body.maxtask;


    let progressModel = new ProgressBar(progressbar);
    await progressModel.save();


    await ProgressBar.findOne({userid:req.session.userid}, function (err, res) {
       
        if (res === null) {
            
        } else {
           req.session.pprogressbar=res.progressbar;
           req.session.pprogressbar_id=res._id;
        }
    })


    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject:req.session.ssubject, pprogress:progressbar.progressbar})

})

route.post('/subject', async (req, res) => {
    const beginn = ' <div class="row">';

    const middle0 = '<div class="col-md-6"> <table class="table"> <thead> <tr> <th>1. S</th> <th>Fach</th>  <th>Note</th> </tr>  </thead> <tbody>'
    var middle1='';
    const middle2 = '</tbody>  </table> </div>';

    const middle3='<div class="col-md-6"> <table class="table table-striped">  <thead> <tr> <th>2. S</th>   <th>Fach</th> <th>Note</th>  </tr>  </thead>  <tbody>';
    var middle4='';
    const middle5='  </tbody> </table> </div> ';

    const end = '</div>';

    var secondsem = false;
    var line = 0;
    var nd = 0;
   
    var secondhalf=false;

    Object.entries(req.body).forEach(([k, v]) => {
        var subjectline = '';
       
        if(k == 'Z1_2'){
            line=0;
            secondsem = true;
        }
        if(secondsem===false){
            
            if(secondhalf===false){
                line++;
                middle1+= '<tr> <td> '+ line +'</td> <td> ' + v + '</td> <td>';
                
            }

            if(secondhalf===true){
                middle1+=v+'</td> </tr>';
                
            }
            secondhalf=!secondhalf;
        }
        else{
            if(secondsem===true){
            
                if(secondhalf===false){
                    line++;
                    middle4+= '<tr> <td> '+ line +'</td> <td> ' + v + '</td> <td>';
                    
                }
    
                if(secondhalf===true){
                    middle4+=v+'</td> </tr>';
                    
                }
                secondhalf=!secondhalf;
        }
    }
    })

    var full = beginn+middle0+middle1+middle2+middle3+middle4+middle5+end;

    let subjects={};

    subjects.userid = req.session.userid;
    subjects.subject = full
    req.session.subject=full;

    let subjectModel = new Subject(subjects);
    await subjectModel.save();


    await Subject.findOne({userid:req.session.userid}, function (err, res) {
       
        if (res === null) {
            
        } else {
           req.session.ssubject=res.subject;
           req.session.subject_id=res._id;
        }
})


    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject: req.session.subject, pprogress: req.session.pprogressbar});

})

route.get('/get', async (req, res) => {
    var found = false;
    //const {username, password} = req.query;
    let user = {};
    user.username = req.query.username;

    user.password = crypt.createHash('md5').update(req.query.password).digest('hex')
    console.log('Loggin try')
    //console.log(user);

    await User.findOne(user, function (err, res) {
        if (user) {
            if (res === null) {
                console.log('Wrong E-Mail or Password');
            } else {
                console.log('Found one');
                req.session.email = user.username
                req.session.password = user.password
                req.session.username = res.username2
                req.session.userid = res._id
            
              
                found = true;

            }
        } else
         console.error(err);

    })
    let timetable = {}
    var timetabletheme;
    timetable.userid = req.session.userid;
    await TimeTable.find(timetable, function (err, res) {
        if (res === null) {

        } else {
            
           if(res.length<=0){
            timetabletheme=res.timetable;
            req.session.timet=timetabletheme;
            req.session.timetable_id = res._id
            //console.log(res)
           }else{
            timetabletheme=res[0].timetable;
            req.session.timetable_id = res[0]._id
            req.session.timet=timetabletheme;
            //console.log(res)
            
           }
            
           
        }
        console.log(req.session);
    })

    let subject = {}
    var subjecttheme;
    subject.userid = req.session.userid;
    await Subject.find(subject, function (err, res) {
        if (res === null) {

        } else {
            
           if(res.length<=0){
            subjecttheme=res.subject;
            req.session.ssubject=subjecttheme;
            req.session.subject_id = res._id
            console.log(res)
           }else{
            subjecttheme=res[0].subject;
            req.session.ssubject=subjecttheme;
            req.session.subject_id = res[0]._id
            console.log(res)
           }  
        }
        console.log(req.session);
    })
    
    let progressbar = {}
    var progressbartheme;
    progressbar.userid = req.session.userid;
    await ProgressBar.find(progressbar, function (err, res) {
        if (res === null) {

        } else {
            
           if(res.length<=0){
            progressbartheme=res.progressbar;
            req.session.pprogressbar=progressbartheme;
            req.session.pprogressbar_id = res._id
            console.log(res)
           }else{
            progressbartheme=res[0].progressbar;
            req.session.pprogressbar=progressbartheme;
            req.session.pprogressbar_id = res[0]._id
            console.log(res)
           }  
        }
        console.log(req.session);
    })

    if (found === true) {
        
            res.render('theme', {username: req.session.username, ttime:timetabletheme, ssubject: subjecttheme, pprogress:  req.session.pprogressbar});
        
    } else
        console.log('Wrong E-Mail or Password')
})






const mongodb = require('mongodb');
const progressbar = require('./models/progressbar');
const { db } = require('../Users');
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary

route.get("/download", (req, res) => {
    getFiles(res)
})

function getFiles(res) {
    mongoClient.connect('mongodb+srv://SypProject:SypProjekt@spx.fsup9.mongodb.net/SPx?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('uploadDB')
            let collection = db.collection('files')
            collection.find({}).toArray((err, doc) => {
                if (err) {
                    console.log('err in finding doc:', err)
                }
                else {
                    let buffer = doc[0].file.buffer
                    res.end(new Buffer(buffer, 'binary') );
                }
            })
            client.close()
            res.redirect('/')
        }

    })
}

route.post("/upload", (req, res) => {
    let file = { name: req.body.name, file: binary(req.files.uploadedFile.data), filetype: req.body.filetype , userid:req.session.userid}
    insertFile(file, res)
})

function insertFile(file, res) {
    mongoClient.connect('mongodb+srv://SypProject:SypProjekt@spx.fsup9.mongodb.net/SPx?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('SPx')
            let collection = db.collection('files')
            try {
                collection.insertOne(file)
                console.log('File Inserted')
            }
            catch (err) {
                console.log('Error while inserting:', err)
            }
            client.close()
          res.render('documents', {data:[]})
        }

    })
}




route.post('/updateTaskbar', async (req, res) => {
    
    var progress = req.session.pprogressbar;
    var amount = parseInt(req.body.updateprogress);
    var x = `${progress}`;
    await ProgressBar.findOne({_id:req.session.pprogressbar_id}, function (err, res) {
        if (res === null) {
        } else {
            var max = parseInt(res.amountoftasks);
            if(amount<=max){
               
                var x2 = x.split("width: ");
                var x3 = x2[1].split("%");
                var insertvalue=`style="width: ${amount/max*100}%"`;
                var replacevalue = `style="width: ${x3[0]}%"`
                x=x.replace(replacevalue,insertvalue);
                req.session.pprogressbar=x;
                
            }
            else{
            }
        }
    })
    await ProgressBar.updateOne({}, { progressbar: x });
    res.render('theme', {username: req.session.username, ttime:req.session.timet, ssubject:req.session.ssubject, pprogress:x})

})


//
route.post("/changettime", async (req, res) => {
    var head='';

    var namedays=""; 
   
    await TimeTable.find({_id:req.session.timetable_id}, function (err, res) {
        if (res === null) {
        } else {

          namedays = ' <p> <button style="margin-left: -15px;" type="button" class="btn btn-lg btn-default">'+`${res[0].name}`+'</button> </p> <div class="page-header"> <h1> <span class="label label-default" id="M">Monday</span> <span class="label label-primary" id="Thue">Thuesday</span> <span class="label label-success" id="W">Wednesday</span> <span class="label label-info" id="Thur">Thursday</span> <span class="label label-warning" id="F">Friday</span> </h1>'
          head = namedays+'<div class="row"> <div class="col-md">   <table class="table">  <thead> ';
          const end =  '  </thead></table></div></div>';
          var Middle="";
          var line = "<tr>"
      
          Object.entries(req.body).forEach(([k, v]) => {
           
                      if(parseInt(k) % 5 == 0){
                          line += "<th>"+v+"</th>";
                          line += "</tr>"
                          Middle += line;
                          line = "<tr>"
                      }
                      else{
                          line += "<th>"+v+"</th>";
                      }  
          })
      
          
                      
          head += Middle + end;
        }
    })
    await TimeTable.updateOne({}, { timetable: head});
    req.session.ttime=head
    res.render('theme', {username: req.session.username, ttime:req.session.ttime, ssubject:req.session.ssubject, pprogress:req.session.pprogressbar})

   
})


module.exports = route;