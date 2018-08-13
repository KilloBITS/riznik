'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection(global.SQLoptions);
connection.connect();
var folder1 = __dirname + '/../publick/image/slide/';

var dataNext;
var parseBase = (req, res, next) => { 
    connection.query('SELECT * FROM tovar left join tovarStars ON tovar.id = tovarStars.id WHERE tovar.id="' + req.url.replace(/[^-0-9]/gi, '') + '"', function (errors, results, fields) {
        dataNext = results;
        next();
    });
};

router.get('/product/*', parseBase, function (req, res, next) {
    console.log(dataNext);
    res.render('product.ejs',{data:dataNext});
});

module.exports = router;
