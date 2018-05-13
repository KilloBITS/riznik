'use strict';
/* global __dirname, config */
let express = require('express');
let app = express();
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
app.get('/panel', admin);

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
global.session = {};

let createSession = (res, result, login) => {
    let aKey = key_generator(35);
    let id = result.id;
    res.cookie('AuthKEY', aKey);
    res.cookie('uID', id);
    global.session[aKey] = {aKey: aKey, id: id, log: login};   
};

app.post('/logout', function(req,res){
    delete global.session[req.cookies.AuthKEY];
});

app.post('/init', function(req, res){
    if (!global.session[req.cookies.AuthKEY]) {
        res.send('450');
    }else{
        res.send('{"code": "500","user":"'+global.session[req.cookies.AuthKEY].log+'", "url":"/panel"}');
    }
});

app.post('/auth', function(req, res){
    let login = req.body.log;
    let pass = req.body.pass;
    connection.query('SELECT * FROM `users` WHERE name="'+login+'"', function (error, result, fields) {
        if (result.length > 0) {
            if (login === result[0].name) {
                if (pass === result[0].password) {
                    createSession(res, result[0], login);
                    res.send('{"code":"500", "txt":"Вітаємо вас, '+login+'", "user":"'+login+'" , "url": "/panel"}');
                } else {
                    res.send('{"code":"450", "error":"Ошибка авторизации!"}');
                }
            } else {
                res.send('{"code":"450", "error":"Ошибка авторизации!"}');
            }
        } else {
            res.send('{"code":"450", "error":"Ошибка авторизации!"}');
        }
    });
});

connection.query("SELECT * FROM `main` WHERE 1", function (error, result){
    global.main = result;
    console.log('Данные главной страницы получены!');
});

app.listen(80, function(){
    console.log('Started server from 80 port');
});

