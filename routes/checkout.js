'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

var folder1 = __dirname + '/../publick/image/slide/';

router.get('/checkout', function(req, res, next){
    res.render('Checkout.ejs');  
});

module.exports = router;
