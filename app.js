'use strict';
/* global __dirname, config */
let express = require('express');
let app = express();
let app2 = express();
let http = require('http');
var bParser = require('body-parser');
var cookieParser = require('cookie-parser');
var InstagramAPI = require('instagram-api');
//7725656041.1677ed0.5aade3d607d34211b0f95abefb37acd8
var accessToken = '7725656041.1677ed0.5aade3d607d34211b0f95abefb37acd8';//5562828690.1677ed0.8acf44b1448249d1bdae3ca9bbba69dc
var instagramAPI = new InstagramAPI(accessToken);
// instagram 
instagramAPI.userSelf().then(function (result) {
//     console.log(result.data); // user info 
//     console.log(result.limit); // api limit 
    // console.log(result.remaining) // api request remaining

}, function (err) {
    console.log(err); // error info 
});

var mysql = require('mysql');
global.SQLoptions =  {
    host     : '52.14.180.56',
    port     : 3306,
    user     : 'riznik',
    password : 'yaPn6eZQHBnBeOf8',
    database : 'PanRiznyk'
};

var connection = mysql.createConnection(global.SQLoptions);
connection.connect();

global.instaImage = [];
function insta() {
    global.instaImage = [];
    instagramAPI.userMedia("7725656041", accessToken).then(function (result) {  //5562828690  7725656041
        for (var i = 0; i < (result.data).length; i++) {
            var a = result.data[i];
            global.instaImage.push(a);//.images.standard_resolution.url
        }
    });
}


//использование библиотек
app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());

let index = require('./routes/index');
app.get('/', index);

let shop = require('./routes/shop');
app.get('/shop', shop);



app.get('*', function (req, res) {
    res.redirect('/');
});

app.post('/main', function (req, res) {
    res.send(global.instaImage);
});


let udateData = () => {
    console.log('dataUpdated');
};


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riznik.comment@gmail.com',
        pass: 'qazwsx159357'
    }
});

function mailOptions(a,b,c,d){
    this.from = a,//'riznik.comment@gmail.com',
    this.to = b,//'mr.kalinuk@gmail.com',
    this.subject = c,//'Sending Email using Node.js',
    this.text = d;//'That was easy!';
}

app.post('/sendMessage', function (req, res) {   
    let txt = req.body.msgText + '[Відпавник: '+req.body.name+', email: '+req.body.email+']';
    let ml = new mailOptions(req.body.email, 'panriznik@gmail.com',  'Коментар користувача.', txt); //panriznik@gmail.com
    
    transporter.sendMail(ml, function(error, info){
        if (error) {
            console.log(error);
            res.send(false);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(true);
        }
    });
});

app.listen(80, function () {
    console.log('Started server from 80 port');
    insta();
    udateData();
});



app2.use(express.static(__dirname + '/publick/'));
app2.use(bParser.urlencoded({extended: true}));
app2.use(bParser.json());
app2.use(cookieParser());

let auth = require('./routes/auth');
app2.get('/', auth);

let panel = require('./routes/admin');
app2.get('/panel', panel);



function key_generator(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //to upper 
    var numeric = '01234567895645874684156873524357454151156468755154686002545641025374';
    var password = "";
    var character = "";
    while (password.length < length) {
         var entity1 = Math.ceil(string.length * Math.random() * Math.random());
         var entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
         var hold = string.charAt(entity1);
            hold = (entity1 % 2 === 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        password = character;
    }
    return password;
}


function mailOptions2(a,b,c,d){
    this.from = a,//'riznik.comment@gmail.com',
    this.to = b,//'mr.kalinuk@gmail.com',
    this.subject = c,//'Sending Email using Node.js',
    this.text = d;//'That was easy!';
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
    
app2.post('/auth', function(req, res, next){
    connection.query('SELECT * FROM `Users` WHERE Name="' + req.body.L + '"', function (errors, results, fields) {
        if (results.length > 0) {
            if (results[0].password === req.body.P) {
                
                                  
                    let users = 'userID'+results[0].Name;
                    global[users] = {a: true, b:[results[0]]};   
                    let txt = randomInteger(100000, 999999).toString();
                    let ml = new mailOptions2(req.body.email, results[0].email ,  'Код підтвердження: ', txt); //panriznik@gmail.com
                    transporter.sendMail(ml, function(error, info){
                        if (error) {
                            console.log(error);
                            res.send('Неверный логин или пароль');
                        } else {
                            console.log('Email sent: ' + info.response);
                            let users1 = 'userSMS'+results[0].Name;
                            global[users1] =  txt;
                            res.send('{"code":500 , "data": "good"}');
                        }
                    });
                    
                    
                    
            }else{
                res.send('Неверный логин или пароль');
            }          
        } else {
            res.send('Неверный логин или пароль');
        }
    });    
});


  
app2.post('/authSMS', function(req, res, next){
    let users1 = 'userSMS'+req.body.N;
    let users = 'userID'+req.body.N;
    let code = global[users1];
    
    if(code === req.body.S){
        var newKey = key_generator(35);
        res.cookie('AuthKEY', newKey);
        res.cookie('uID', global[users].b[0].id);    
        res.cookie('uName', global[users].b[0].Name);   
        res.send('{"code":500 , "url": "/panel"}')
    }
    
    
});

app2.listen(3000, function () {
    console.log('Started server from 3000 port');
});
