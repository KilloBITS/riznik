'use strict';
/* global __dirname, config */
let express = require('express');
let app = express();
let app2 = express();
let http = require('http');
var mysql = require('mysql');
var bParser = require('body-parser');
var cookieParser = require('cookie-parser');

global.SQLoptions =  {
    host     : '18.188.39.49',
    user     : 'killer',
    password : '26061997q',
    database : 'riznik'
};
var connection = mysql.createConnection(global.SQLoptions);
connection.connect();

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

app2.listen(3000, function(){
    console.log('Started server from 3000 port');
});


app.listen(80, function(){
    console.log('Started server from 80 port');
});

