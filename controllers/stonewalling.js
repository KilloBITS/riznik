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

var stonewalling = function(req, res, next)  {    
    connection.query('SELECT * FROM `stonewalling` WHERE 1', function (errors, results, fields) {
        res.send(results);
    });  
};

router.post('/stonewalling', stonewalling, function(req, res, next){});

module.exports = router;

