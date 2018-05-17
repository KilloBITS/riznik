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
instagramAPI.userSelf().then(function(result) {
    // console.log(result.data); // user info 
    // console.log(result.limit); // api limit 
    // console.log(result.remaining) // api request remaining
  
}, function(err){
    console.log(err); // error info 
});

global.instaImage = [];
function insta(){
global.instaImage = [];
instagramAPI.userMedia("7725656041", accessToken).then(function(result){  //5562828690  7725656041
      for (var i = 0; i < (result.data).length; i++) {
        var a = result.data[i];
        console.log(a);
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

let admin = require('./routes/admin');
app2.get('/panel', admin);

app.get('*', function(req, res){
    res.redirect('/');
});


app.post('/main', function(req, res){
    res.send(global.instaImage);
});

app2.listen(3000, function(){
    console.log('Started server from 3000 port');
});


app.listen(80, function(){
    console.log('Started server from 80 port');
    insta();
});

