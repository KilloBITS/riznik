'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

var folder1 = __dirname + '/../publick/image/slide/';

router.get('/', function(req, res, next){
    fs.readdir(folder1, (err, files) => {
        res.render('index.ejs',{slides: files}); 
    });    
    
});

module.exports = router;

