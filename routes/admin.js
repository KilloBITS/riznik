'use strict';
/* global __dirname, config */
let express = require('express');
let router2 = express.Router();

var bParser = require('body-parser');
router2.use(bParser.urlencoded({extended: true}));
router2.use(bParser.json());

function parseAdmin(req, res, next) {
//    connection.query('SELECT * FROM `users` WHERE id="' + req.cookies.uID + '"', function (errors, results, fields) {
//        if (results.length > 0) {
//            if (results[0].rank > 1) {
//                next();
//            }          
//        } else {
//            res.redirect('/');
//        }
//    });
    console.log(req.query['login']);
    console.log(req.query['pass']);
    console.log(req.query['authBtn']);
//    next();
res.redirect('/');
}




router2.get('/panel',parseAdmin, function(req, res, next){    
    res.render('admin.ejs');  
});

module.exports = router2;

