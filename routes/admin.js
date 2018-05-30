'use strict';
/* global __dirname, config */
let express = require('express');
let router2 = express.Router();
var mysql = require('mysql');
var bParser = require('body-parser');
router2.use(bParser.urlencoded({extended: true}));
router2.use(bParser.json());

//
var connection = mysql.createConnection(global.SQLoptions);
connection.connect();


function parseAdmin(req, res, next) {
//    connection.query('SELECT * FROM `Users` WHERE Name="' + '10' + '"', function (errors, results, fields) {
//        if (results.length > 0) {
//            if (results[0].password === req.query['pass']) {
//                next();
//            }else{
//                res.redirect('/');
//            }          
//        } else {
//            res.redirect('/');
//        }
//    });
//    res.redirect('/');
next();
}




router2.get('/panel',parseAdmin, function(req, res, next){    
    res.render('admin.ejs');  
});

module.exports = router2;

