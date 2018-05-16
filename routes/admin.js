'use strict';
/* global __dirname, config */
let express = require('express');
let router2 = express.Router();
let fs = require('fs');
var cookieParser = require('cookie-parser');
let path = require('path');
var mysql = require('mysql');

var folder1 = __dirname + '/../publick/image/slide/';

router2.use(cookieParser());

var connection = mysql.createConnection(global.SQLoptions);
connection.connect();

function parseAdmin(req, res, next) {
    connection.query('SELECT * FROM `users` WHERE id="' + req.cookies.uID + '"', function (errors, results, fields) {
        if (results.length > 0) {
            if (results[0].rank > 1) {
                next();
            }          
        } else {
            res.redirect('/');
        }
    });
}




router2.get('/panel',parseAdmin, function(req, res, next){
    res.render('admin.ejs');  
});

module.exports = router2;

