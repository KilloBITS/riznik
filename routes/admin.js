'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

var folder1 = __dirname + '/../publick/image/slide/';

router.get('/panel', function(req, res, next){
    res.render('admin.ejs');  
});

module.exports = router;

