'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

var folder1 = __dirname + '/../publick/image/slide/';

router.get('/', function(req, res, next){
    console.log(global.mainData);
    res.render('index.ejs',{main_data: global.mainData, partners: global.partners}); 
});

module.exports = router;

