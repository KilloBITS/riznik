'use strict';
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var ipOptSQL = {
    host: '52.14.180.56',
    port: 3306,
    user: 'riznik',
    password: 'yaPn6eZQHBnBeOf8',
    database: 'PanRiznyk'
};

var connection = mysql.createConnection(ipOptSQL);
connection.connect();

var auth = function(req, res, next)  {
    var d = req.body.l.replace(/[^-0-9]/gim,'');
    var s = req.body.p;
    
    connection.query('SELECT * FROM `Users` WHERE number="'+d+'"' , function (errors, results, fields) {
        res.send({code:500, message:"Авторизація успішна", data: results});
    });  
};

router.post('/auth', auth, function(req, res, next){});

module.exports = router;