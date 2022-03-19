const express = require("express");
const mogoose = require("mongoose");
const User = require("../models/User");
const Contacts = require("../models/Contact");
const Classu = require("../models/Class");
const route = express.Router();
const crypt = require("crypto");
const mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
let ejs = require("ejs");
const si = require("systeminformation")
const sorterjs = require("sort-nested-json");

route.get("/createAccount", async (req, res) => {
  let user = {};
  user.username = req.query.usern;
  user.email = req.query.email;
  user.password = crypt.createHash('sha256').update(req.query.pass).digest('hex');
  user.profilepicture = req.query.picture;
  let userModel = new User(user);
  await userModel.save();
  res.render("login");
});

route.post("/loginAccount", async (req, res) => {
  let user = {};
  user.email = req.body.email;
  user.password = crypt
    .createHash("sha256")
    .update(req.body.pass)
    .digest("hex");
  var found = false;
  let userModel = new User(user);
  var userf;
  await User.findOne(user, function (err, res) {
    if (res === null) {
      console.log("Wrong E-Mail or Password");
    } else {
      found = true;
      userf = res._doc;
    }
  });

 setTimeout(() => {
  if (found) {
    req.session.userid = userf._id;
    req.session.uemail = userf.email;
    req.session.picid = userf.profilepicture;

    res.render("dashboard", {
      userid: req.session.userid,
      uemail: req.session.uemail,
      picid: req.session.picid
    });
  } else {
    res.render("login");
  }
 }, 1750);
});

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const binary = mongodb.Binary;

route.post("/upload", (req, res) => {
  var today = new Date();

  let file = {
    name: req.files.uploadedFile.name,
    file: binary(req.files.uploadedFile.data),
    filetype: req.files.uploadedFile.mimetype,
    text: req.body.textvalue,
    title: req.body.title,
    date:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
    userid: req.session.userid,
    class: req.body.selectclass,
  };

  insertFile(file, res);

  res.redirect("back")
  res.render("dashboard", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

var url = "mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

route.get("/deletehandout", async (req, res) => {
  
  let file = {};
  file.id = req.query.idofhandout;
  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("Voca");
    var collection = dbo.collection("files");
    await collection.find().toArray(function (err, res) {
      res = res.filter((elements) => elements._id == req.query.idofhandout);
      collection.deleteOne(res[0]);
      if (err) throw err;

      db.close();
    });
  });

  await res.render("dashboard", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

route.get("/usehandout", async (req, res) => {
  res.render("choosenho", { id: req.query.idofhandout });
});

route.get("/deletevoca", async (req, res) => {
  let file = {};
  file.id = req.query.idofvoca;
  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("kahootDB");
    var collection = dbo.collection("kahootGames");
    await collection.find().toArray(function (err, res) {
      res = res.filter((elements) => elements.id == req.query.idofvoca);
      collection.deleteOne(res[0]);
      if (err) throw err;

      db.close();
    });
  });

  await res.redirect("back");
});

route.get("/saveclass", async (req, res) => {
  let classu = {};
  classu.classname = req.query.classid;
  classu.userid = req.session.userid;

  let classModel = new Classu(classu);
  await classModel.save();
  res.render("dashboard", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

route.get("/editvoca", async (req, res) => {
    res.render("editvoca", {id: req.query.idofvoca, picid: req.session.picid})
});

route.get("/renderdashboard", async (req, res) => {
  res.render("dashboard", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});


route.get("/showvocas", async (req, res) => {
  res.render("create", { id: req.session.userid, picid: req.session.picid});
});

route.get("/startvoca", async (req, res) => {
  res.render("host", { id: req.query.idofvoca});
});

route.get("/useplayer", async (req, res) => {
  console.log(req.query);
  res.render("player", { data: req.query });
});

route.get("/startplayer", async (req, res) => {
  // console.log(req.query)
  res.render("game", { id: req.query.hostid });
});

route.get("/playerscreen", async (req, res) => {
  // console.log(req.query)
  res.render("playergame", { id: req.query.socketid }); //, {id:req.query.hostid})
});

route.get("/showhandouts", async (req, res) => {
  res.render("viewtext", { id: req.session.userid, picid: req.session.picid});
});

route.get("/createhandout", async (req, res) => {
  res.render("createhandout", { userid: req.session.userid, picid: req.session.picid});
});

route.get("/practicemode", async (req, res) => {
  //practisemode
  res.render("practice", { id: req.session.userid, picid: req.session.picid});
});

route.get("/startpracticemode", async (req, res) => {
  //practisemode
  res.render("practicegame", { id: req.query.idofvoca });
});

route.get("/allclasses", async (req, res) => {
  //practisemode
  res.render("allclasses", { userid: req.session.userid, picid: req.session.picid});
});

route.get("/textofphoto", async (req, res) => {
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
  var name = "Created on phone";

  for (var i = 0; i < split.length; i += 2) {
    var question = split[i];
    var answer1 = split[i + 1];
    var correct = "1";
    var answers = [answer1];

    questions.push({ question: question, answers: answers, correct: correct });
  }
  var data = { id: 0, name: name, questions: questions };

  console.log(question);

  //console.log(words)

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("kahootDB");
    dbo
      .collection("kahootGames")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        var num = Object.keys(result).length;
        if (num == 0) {
          data.id = 1;
          num = 1;
        } else {
          data.id = result[num - 1].id + 1;
        }
        var game = data;
        dbo.collection("kahootGames").insertOne(game, function (err, res) {
          if (err) throw err;
          db.close();
        });
        db.close();
      });
  });
});

route.post("/edithandout", (req, res) => {
  MongoClient.connect(url, async function(err, db){
    if (err) throw err;
    var dbo = db.db('Voca');
    var idnew;
    await dbo.collection("files").find().toArray(async function(err, res) {
        //"id":0 ,"name": name, "questions": questions, "idofold":  window.location.href.split('=')[1]
        res = res.filter(elements => elements._id==req.body.idofhandout)
        idnew=res[0]
        dbo.collection("files").deleteOne(res[0]);
        if (err) throw err;

        await dbo.collection('files').find({}).toArray(function(err, result){
            if(err) throw err;
           
            var handout = { "name": idnew.name, "file": idnew.file, "filetype":idnew.filetype, "title": req.body.title, "text": req.body.textvalue, "date":idnew.date, "userid":req.session.userid, "class":idnew.class};
            console.log(handout)
            dbo.collection("files").insertOne(handout, function(err, res) {
                if (err) throw err;
            });
            db.close();
        });
    });
});

  res.render("dashboard", { userid: req.session.userid, picid: req.session.picid});
});

function insertFile(file, res) {
  mongoClient.connect(
    "mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/DatabaseDA?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        return err;
      } else {
        let db = client.db("Voca");
        let collection = db.collection("files");
        try {
          collection.insertOne(file);
          console.log("File Inserted");
        } catch (err) {
          console.log("Error while inserting:", err);
        }
        client.close();
      }
    }
  );
}

route.get("/quizcreation", (req, res) => {

  var data = JSON.parse(req.query.game)
  
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

  res.render("dashboard", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

route.get("/createquiz", (req, res) => {
  res.render("quiz-creator", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

route.get("/gottoedith", (req, res) => {
  res.render("edithandout", {
    userid: req.session.userid,
    uemail: req.session.uemail,
    picid: req.session.picid
  });
});

route.get("/searchvocas", (req, res) => {
 console.log("query", req.query)
 res.render("searchforvocas", {
  userid: req.session.userid,
  uemail: req.session.uemail,
  picid: req.session.picid,
  vocaname: req.query.titleofvoca
});
});


route.post("/incomingcontact", async (req, res) => {
  //console.log(req.body)

  var contact = {};
  contact.name = req.body.name;
  contact.email = req.body.email
  contact.message = req.body.message

  let contactModel = new Contacts(contact);
  await contactModel.save();
 });

 route.get("/admin", async (req, res) => {
  //console.log(req.body)
    res.render("adminlogin")
 });


 route.post("/loginadmin", async (req, res) => {
 
  if(req.body.username=="admin" && req.body.password == "admin"){
    await getnvocas()
    await getnhandouts()
    await getnuser()
    await getnclasses()


    
    // var usedmem;
    // si.mem().then((x)=>{usedmem = x.used/(1024*1024*1024)+ " GiB"})
    // var totalmem;
    // si.mem().then((x)=>{totalmem = x.total/(1024*1024*1024)+ " GiB"})
    // var usedcached;
    // si.mem().then((x)=>{usedcached = x.chached/(1024*1024*1024)+ " GiB"})

    // var speedavgcpu;
    // si.cpuCurrentSpeed().then((x)=>{speedavgcpu = x.avg})
    // var speedmincpu;
    // si.cpuCurrentSpeed().then((x)=>{speedmincpu = x.min})
    // var speedmaxcpu;
    // si.cpuCurrentSpeed().then((x)=>{speedmaxcpu = x.max})

    // var tempretureavg;
    // si.cpuTemperature().then((x)=>{tempretureavg = x.main})

    // var tempreturemax;
    // si.cpuTemperature().then((x)=>{tempreturemax = x.max})

    var dataofg = [];

    mongoClient.connect(
      "mongodb+srv://Dalyan:Dalyan@cluster0.3r4k7.mongodb.net/DatabaseDA?retryWrites=true&w=majority",
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          return err;
        } else {
          let db = client.db("kahootDB");
          db.collection("kahootGames").find().toArray(function(err, res) {
            
            sorterjs.sort(res.filter(x=>x.played!==undefined&&!isNaN(x.played))).desc("played").forEach(element=>{
              dataofg.push({name:element.name, played:element.played})
            })
            if (err) throw err;
        });
        }
      }
    );


   

    setTimeout(async function() {
      //console.log(dataofg)
      res.render("admindashboard", {
        Members: nuser, 
        Handouts: nhandouts,
        Classes: nclasses,
        Vocas:nvocas,
        data:JSON.stringify(dataofg)
      })
    }, 2000);

   
  }
 });

 

 async function getnclasses(){
  await Classu.find({}, function (err, res) {
    nclasses = res.length
  });
 }
 

 async function getnuser(){
 await User.find({}, function (err, res) {
  nuser=res.length
 });
}


async function getnhandouts(){
  MongoClient.connect(url, async function(err, db){
    if (err) throw err;

    var dbo =  db.db('Voca');
  
     dbo.collection("files").find().toArray(function(err, res) {
     
       nhandouts = res.length;
    });

    });
}

var nvocas;
var nhandouts;
var nuser;
var nclasses;

async function getnvocas(){
  
    MongoClient.connect(url, async function(err, db){
    if (err) throw err;

    var dbo =  db.db('kahootDB');
  
     dbo.collection("kahootGames").find().toArray(function(err, res) {
     
       nvocas = res.length;
    });

    });
}


route.get("/getcontacttable", async (req, res) => {
 
  var endstring = "";
 
  await Contacts.find({}, function (err, res) {
    
    
  res.forEach(element => {
    endstring+= `;${element.email}^${element.name}^${element.message}^${element._id}`
  });

  endstring = endstring.substring(1,endstring.length)
    
  });


  res.render("tables", {data:endstring});

 });

 route.get("/deletecomment", async (req, res) => {
  await Contacts.remove({ _id: req.query.id }, function(err) {
    if (!err) {
            res.redirect('back')
    }
    else {
          console.log(err)
    }
});

 });


module.exports = route;