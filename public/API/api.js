const express = require('express');
const mogoose = require('mongoose');
const User = require('../models/User');
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
    res.redirect('../Login_v1/index.html')
})

route.get('/loginAccount', async (req, res) => {
    let user = {};
    user.email = req.query.email;
    user.password = crypt.createHash('sha256').update(req.query.pass).digest('hex');
    var found = false;
    console.log('Login try: ')
    console.log(user);
    let userModel = new User(user);
    await User.findOne(user,function(err,res){
        if (res === null) {
            console.log('Wrong E-Mail or Password');
        }
        else{
            found=true;
        }
    });
    // //res.json(userModel);
    // //res.redirect('../static4/sign-in.html');
 
    
    if(found){
        res.redirect('../dashboard/index.html')
    }
    else{
        res.redirect('../Login_v1/index.html')
    }
})

const mongodb = require('mongodb');
const { cwd } = require('process');
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary


route.post("/upload", (req, res) => {
    var today = new Date();
    let file = { name: req.files.uploadedFile.name, file: binary(req.files.uploadedFile.data), filetype: req.files.uploadedFile.mimetype, text: req.body.textvalue, title: req.body.title, date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}
    insertFile(file, res)
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
   
    await res.redirect('back')
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


route.get("/textofphoto", async(req, res) => {
    //console.log(req.query);
   console.log(req.query);
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
          res.redirect("../index.html");
        }

    })
}


module.exports = route;