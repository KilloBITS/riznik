'use strict';
/* global __dirname, config */
let express = require('express');
let router2 = express.Router();
var mysql = require('mysql');
var bParser = require('body-parser');
var cookieParser = require('cookie-parser');

router2.use(bParser.urlencoded({extended: true}));
router2.use(bParser.json());

router2.use(cookieParser());


function parseAdmin(req, res, next) {
//    let AuthKEY = req.cookies.AuthKEY;
//    let uID = req.cookies.uID;
//    let users = 'userID' + req.cookies.uName;
//    if(global[users]){
//        next();
//    }else{
//       res.redirect('/'); 
//    }
//    
    next();
}

router2.get('/panel',parseAdmin, function(req, res, next){    
    res.render('admin.ejs');  
});

module.exports = router2;

