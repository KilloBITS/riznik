'use strict';
/* global __dirname, config */
let express = require('express');
let router2 = express.Router();
var cookieParser = require('cookie-parser');
router2.use(cookieParser());

router2.get('/', function(req, res, next){
    res.render('auth.ejs');  
});

module.exports = router2;