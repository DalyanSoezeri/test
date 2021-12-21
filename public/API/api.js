const express = require('express');
const mogoose = require('mongoose');
const User = require('../models/User');
const Classu = require('../models/Class');
const route = express.Router();
const crypt = require('crypto');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
let ejs = require('ejs');  

route.get('/createAccount', async (req, res) => {
    let user = {};
    user.username = req.query.usern;
    user.email = req.query.email;
    user.password = crypt.createHash('sha256').update(req.query.pass).digest('hex');
    
    console.log('Account creation: ')
    console.log(user);
    let userModel = new User(user);
    await userModel.save();
    // //res.json(userModel);
    // //res.redirect('../static4/sign-in.html');

})

route.get('/loginAccount', async (req, res) => {
    let user = {};
    user.email = req.query.email;
    user.password = crypt.createHash('sha256').update(req.query.pass).digest('hex');
    var found = false;
    console.log('Login try: ')
    console.log(user);
    let userModel = new User(user);
    var userf;
    await User.findOne(user,function(err,res){
        if (res === null) {
            console.log('Wrong E-Mail or Password');
        }
        else{
            found=true;
            userf = res._doc
        }
    });
    
        if(found){
            req.session.userid = userf._id;
            req.session.uemail = userf.email
           
           
            res.render('dashboard',  {userid: req.session.userid, uemail: req.session.uemail})
        }
        else{
            res.render('login')
        }
    
})

const mongodb = require('mongodb');
const { cwd } = require('process');
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary


route.post("/upload", (req, res) => {
    var today = new Date();
   
    let file = { name: req.files.uploadedFile.name, file: binary(req.files.uploadedFile.data), filetype: req.files.uploadedFile.mimetype, text: req.body.textvalue, title: req.body.title, date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(), userid: req.session.userid, class: req.body.selectclass}
   
    insertFile(file, res)

    res.render('dashboard',  {userid: req.session.userid, uemail: req.session.uemail})
})


var url = "mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
route.get("/deletehandout", async(req, res) => {
    //console.log(req.query);
    let file={};
    file.id=req.query.idofhandout;
    await MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dbo = db.db('Voca');
        var collection = dbo.collection("files");
        await collection.find().toArray(function(err, res) {
            res = res.filter(elements => elements._id==req.query.idofhandout)
            collection.deleteOne(res[0]);
            if (err) throw err;
           
            db.close();
        });
    });
   
    await  res.render('dashboard',  {userid: req.session.userid, uemail: req.session.uemail})
})


route.get("/usehandout", async(req, res) => {
   res.render("choosenho", {id:req.query.idofhandout})
})


route.get("/deletevoca", async(req, res) => {
    //console.log(req.query);
    let file={};
    file.id=req.query.idofvoca;
    await MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dbo = db.db('kahootDB');
        var collection = dbo.collection("kahootGames");
        await collection.find().toArray(function(err, res) {
            res = res.filter(elements => elements.id==req.query.idofvoca)
            collection.deleteOne(res[0]);
            if (err) throw err;
           
            db.close();
        });
    });
   
    await res.redirect('back')
})

route.get("/saveclass", async(req, res) => {
    let classu = {};
    classu.classname = req.query.classid;
    classu.userid = req.session.userid;

    let classModel = new Classu(classu);
    await classModel.save();
    res.render('dashboard',  {userid: req.session.userid, uemail: req.session.uemail})
})

route.get("/showvocas", async(req, res) => {
    res.render("create", {id:req.session.userid})
 })

route.get("/startvoca", async(req, res) => {
   res.render("host", {id:req.query.idofvoca})
})

route.get("/useplayer", async(req, res) => {
    console.log(req.query)
    res.render("player", {data:req.query})
 })

 route.get("/startplayer", async(req, res) => {
   // console.log(req.query)
   res.render("game", {id:req.query.hostid})
 })

 route.get("/playerscreen", async(req, res) => {
    // console.log(req.query)
    res.render("playergame", {id:req.query.socketid})//, {id:req.query.hostid})
  })

  route.get("/showhandouts", async(req, res) => {
    res.render("viewtext", {id:req.session.userid})
 })

route.get("/createhandout", async(req, res) => {

   res.render("createhandout", {userid: req.session.userid})
})

route.get("/practicemode", async(req, res) => {//practisemode
    res.render("practice", {id:req.session.userid})
 })

 route.get("/startpracticemode", async(req, res) => {//practisemode
    res.render("practicegame", {id:req.query.idofvoca})
 })

 route.get("/allclasses", async(req, res) => {//practisemode
    res.render("allclasses", {userid:req.session.userid})
 })



route.get("/textofphoto", async(req, res) => {
    //console.log(req.query);
   console.log(req.query);

   var split = req.query.value.split(",");
//    split.forEach(element => {
//        console.log(element)
//    });
//    var words = [];
//    for (let index = 0; index < split.length; index+=2) {
//        var ka = split[index]+"";
//        words.push({ka:split[index+1]});
//    }
   
   var questions = [];
   var name = "Created on phone"
   
   for(var i = 0; i < split.length; i+=2){
       var question = split[i]
       var answer1 = split[i+1]
       var correct = "1";
       var answers = [answer1]
       
       questions.push({"question": question, "answers": answers, "correct": correct})
   }
   var data = {"id":0 ,"name": name, "questions": questions};
  
   console.log(question)
   
   //console.log(words)

   MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db('kahootDB');
    dbo.collection('kahootGames').find({}).toArray(function(err, result){
        if(err) throw err;
        var num = Object.keys(result).length;
        if(num == 0){
            data.id = 1
            num = 1
        }else{
            data.id = result[num -1 ].id + 1;
        }
        var game = data;
        dbo.collection("kahootGames").insertOne(game, function(err, res) {
            if (err) throw err;
            db.close();
        });
        db.close();
        
    });
    
});
})


route.post("/edithandout", (req, res) => {
    MongoClient.connect(url, async function(err, db){
        if (err) throw err;
        var dbo = db.db('Voca');
        await dbo.collection("files").updateOne({},{$set:{text:req.body.textvalue, title:req.body.title}});
    });
    
    res.redirect('../dashboard/index.html')
})

function insertFile(file, res) {
    mongoClient.connect('mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/DatabaseDA?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('Voca')
            let collection = db.collection('files')
            try {
                collection.insertOne(file)
                console.log('File Inserted')
            }
            catch (err) {
                console.log('Error while inserting:', err)
            }
            client.close()
            
        }

    })
}

route.get('/createquiz', (req, res) => {
    res.render('quiz-creator',  {userid: req.session.userid, uemail: req.session.uemail})
})


module.exports = route;