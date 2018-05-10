'use strict';
/* global __dirname, config */
let express = require('express');
let app = express();
let http = require('http');

app.use(express.static(__dirname + '/publick/'));

let index = require('./routes/index');
app.get('/', index);
let shop = require('./routes/shop');
app.get('/shop', shop);

app.listen(80, function(){
    console.log('Started server from 80 port');
});